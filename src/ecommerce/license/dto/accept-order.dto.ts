import { IsNotEmpty, IsNumber } from 'class-validator';
export class AcceptOrderDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsNumber()
  @IsNotEmpty()
  licenseId: number;
}
