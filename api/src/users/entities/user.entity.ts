import { Optional } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Message } from 'src/messages/entities/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Message, (message) => message.fromUser)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.toUser)
  receivedMessages: Message[];
}
