import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromUser: number;

  @Column()
  toUser: number;

  @Column()
  body: string;
}
