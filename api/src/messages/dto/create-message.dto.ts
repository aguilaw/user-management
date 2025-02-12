import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  fromUserId: number;

  @IsNumber()
  toUserId: number;

  @IsString()
  @IsNotEmpty()
  body: string;
}
