import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCashbackDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  couponId: number;
}
