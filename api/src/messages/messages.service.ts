import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(toUserId: number, createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create({
      toUserId,
      ...createMessageDto,
    });
    return this.messageRepository.save(newMessage);
  }

  async findAllById(id: number) {
    return await this.messageRepository.find({
      where: [{ toUserId: id }, { fromUserId: id }],
      order: {
        sentOn: 'ASC',
      },
    });
  }
}
