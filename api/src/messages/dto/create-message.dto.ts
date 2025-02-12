import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  fromUserId: number;

  @IsString()
  @IsNotEmpty()
  body: string;
}
