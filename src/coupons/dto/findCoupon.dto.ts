import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class FindAllQueryDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  pageSize: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  storeId: number;

  // @Optional()
  // @ArrayUnique()
  // @Transform(({ value }) => {
  //   if (typeof value === 'string') {
  //     const subcategoryIds = value.split(',').map(Number);
  //     if (
  //       !subcategoryIds.every((subcategoryId) =>
  //         Number.isInteger(subcategoryId),
  //       )
  //     ) {
  //       throw new Error('Invalid subcategory IDs format');
  //     }
  //     return subcategoryIds;
  //   }
  //   return value;
  // })
  subCategoryIds: number[];
}
