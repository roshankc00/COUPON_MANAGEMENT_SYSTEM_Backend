import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class FindAllQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Provide the page which you like to get',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Provide the no of items you like in that page ',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  pageSize: number;

  @ApiProperty({
    example: 1,
    description: 'Provide the categoryId ',
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: 'Provide the storeId ',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  storeId: number;

  @ApiProperty({
    example: 1,
    description: 'Provide the subCategoryId ',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  subCategoryId: number;

  @ApiProperty({
    example: [1],
    description: 'Provide the array of subCategoryIds ',
  })
  @Optional()
  subCategoryIds: number[];

  @ApiProperty({
    example: [1],
    description: 'Provide the array of categoryIds ',
  })
  @Optional()
  categoryIds: number[];

  @ApiProperty({
    example: [1],
    description: 'Provide the array of storeIds ',
  })
  @Optional()
  storeIds: number[];
}
