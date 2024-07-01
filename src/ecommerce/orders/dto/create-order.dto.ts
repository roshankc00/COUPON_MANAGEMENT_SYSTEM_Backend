import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  subProductId: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  topUpId: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  otherId: string;

  orderDetails: Record<string, any>;
}
