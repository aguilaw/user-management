import { Message } from 'src/messages/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Message, (message) => message.fromUser)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.toUser)
  receivedMessages: Message[];
}
