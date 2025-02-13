import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users/:id/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  //TODO: eventually we should only need the mssg body. The 'toId' would come from the params and the 'fromId' would be retrieved  from the auth token
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(id, createMessageDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  async getUserWithMessages(@Param('id', ParseIntPipe) id: number) {
    const { messagesReceived, messagesSent } =
      await this.messagesService.getMessagesWithUser(id);
    //TODO: eventually move to a transformer method
    return {
      received: messagesReceived.map((mssg) => ({
        body: mssg.body,
        sentOn: mssg.sentOn,
        fullName: `${mssg.fromUser.firstName} ${mssg.fromUser.lastName}`,
      })),
      sent: messagesSent.map((mssg) => ({
        body: mssg.body,
        sentOn: mssg.sentOn,
        fullName: `${mssg.toUser.firstName} ${mssg.toUser.lastName}`,
      })),
    };
  }
}
