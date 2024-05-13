import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'question must be of atleast   10 characters',
  })
  question: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'answer must be of atleast   10 characters',
  })
  answer: string;
}
