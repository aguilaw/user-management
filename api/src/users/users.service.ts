import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id, isActive: true },
    });
  }
  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email, isActive: true },
    });
  }

  async remove(id: number) {
    return this.usersRepository.update({ id }, { isActive: false });
  }
}
