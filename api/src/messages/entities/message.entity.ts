import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  sentOn: Date;

  @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'toUserId' })
  toUser: User;
}
