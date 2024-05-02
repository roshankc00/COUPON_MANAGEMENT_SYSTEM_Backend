import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SeoDto } from 'src/common/dtos/seo.dto';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'title must be of atleast   3 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'description must be of atleast   10 characters',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'tagLine must be of atleast   3 characters' })
  tagLine: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'code must be of atleast   3 characters' })
  code: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'url must be of atleast   3 characters' })
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  featured: boolean;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  subCategoryId: number;

  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @IsBoolean()
  @IsNotEmpty()
  verified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  exclusive: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
