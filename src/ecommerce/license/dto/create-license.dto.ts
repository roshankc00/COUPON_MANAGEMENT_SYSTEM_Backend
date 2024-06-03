import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateLicenseDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
