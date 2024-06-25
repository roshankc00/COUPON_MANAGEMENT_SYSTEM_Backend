import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  subProductId: number;

  @IsString()
  @IsNotEmpty()
  topUpId: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  otherId: string;
}
