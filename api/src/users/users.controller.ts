import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Post('/register')
  //TODO: Should existing users (added manually to DB with no password) be able to register? or only new entries?
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const token = await this.authService.signIn(user.email, user.password);

    return {
      user,
      ...token,
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
