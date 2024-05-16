import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    example: 'what is you NepQue ',
    description: 'Provide the question',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'question must be of atleast   10 characters',
  })
  question: string;

  @ApiProperty({
    example: 'It is the Coupon platfrom ',
    description: 'Provide the answer',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'answer must be of atleast   10 characters',
  })
  answer: string;
}
