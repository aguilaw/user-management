import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('users/:id/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body(ValidationPipe) createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAllById(@Param('id', ParseIntPipe) id: number) {
    const messages = await this.messagesService.findAllById(id);
    return {
      received: messages.filter((msg) => msg.toUserId === id),
      sent: messages.filter((msg) => msg.fromUserId === id),
    };
  }
}
