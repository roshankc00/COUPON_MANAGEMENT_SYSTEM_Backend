import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateLicenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @IsNumber()
  @IsNotEmpty()
  validityDays: number;

  @IsNumber()
  @IsNotEmpty()
  subProductId: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
