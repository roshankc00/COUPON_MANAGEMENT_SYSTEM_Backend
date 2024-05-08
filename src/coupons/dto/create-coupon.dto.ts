import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SeoDto } from 'src/common/dtos/seo.dto';
import { STATUS_ENUM } from 'src/common/enums/status.enum';

export class CreateCouponDto {
  @ApiProperty({
    example: 'couponname',
    description: 'Provide the title',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'title must be of atleast   3 characters' })
  title: string;

  @ApiProperty({
    example: 'description -----------',
    description: 'Provide the description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'description must be of atleast   10 characters',
  })
  description: string;

  @ApiProperty({
    example: 'tagline -----------',
    description: 'Provide the tagline',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'tagLine must be of atleast   3 characters' })
  tagLine: string;

  @ApiProperty({
    example: 'code -----------',
    description: 'Provide the code',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'code must be of atleast   3 characters' })
  code: string;

  @ApiProperty({
    example: '2022-2-23',
    description: 'Provide the startDate',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: '2022-2-23',
    description: 'Provide the expireDate',
  })
  @IsDate()
  @Type(() => Date)
  expireDate: Date;

  @ApiProperty({
    example: 'url------------',
    description: 'Provide the url',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'url must be of atleast   3 characters' })
  url: string;

  @ApiProperty({
    example: true,
    description: 'Provide the featured',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  featured: boolean;

  @ApiProperty({
    example: 2,
    description: 'Provide the categoryId',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  categoryId: number;

  @ApiProperty({
    example: 2,
    description: 'Provide the subCategoryId',
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  subCategoryId: number;

  @ApiProperty({
    example: 2,
    description: 'Provide the storeId',
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @ApiProperty({
    example: true,
    description: 'Provide the verified',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  verified: boolean;

  @ApiProperty({
    example: true,
    description: 'Provide the exclusive',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  exclusive: boolean;

  @ApiProperty({
    example: {
      title: 'title',
      description: 'description',
    },
    description: 'Provide the object of title and description',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;

  @ApiProperty({
    example: 'enabled',
    description: 'Provide the status',
  })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}
