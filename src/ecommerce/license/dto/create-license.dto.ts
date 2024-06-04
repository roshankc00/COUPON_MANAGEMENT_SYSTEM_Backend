import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateLicenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
