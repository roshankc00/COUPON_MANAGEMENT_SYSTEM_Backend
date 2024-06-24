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
  usercontent: string;
}
