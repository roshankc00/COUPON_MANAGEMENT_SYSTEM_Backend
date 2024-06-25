import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateLicenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expireDate: Date;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  validityDays: number;

  @IsNumber()
  @IsNotEmpty()
  subProductId: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
