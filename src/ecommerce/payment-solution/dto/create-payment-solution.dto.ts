import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentSolutionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  remark: string;
}
