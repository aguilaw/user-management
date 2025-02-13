import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(toUserId: number, createMessageDto: CreateMessageDto) {
    const fromUser = await this.userRepository.findOne({
      where: { id: createMessageDto.fromUserId },
    });
    const toUser = await this.userRepository.findOne({
      where: { id: toUserId },
    });

    if (!fromUser) {
      throw new NotFoundException(`Sender not found.`);
    }
    if (!toUser) {
      throw new NotFoundException(`Receiver not found.`);
    }

    const message = this.messageRepository.create({
      fromUser,
      toUser,
      ...createMessageDto,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesWithUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const messagesSent = await this.messageRepository.find({
      where: [{ fromUser: user }],
      relations: ['toUser'],
    });
    const messagesReceived = await this.messageRepository.find({
      where: [{ toUser: user }],
      relations: ['fromUser'],
    });

    return { messagesReceived, messagesSent };
  }
}
