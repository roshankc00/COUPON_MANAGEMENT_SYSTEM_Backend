import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  @IsNotEmpty()
  couponId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
