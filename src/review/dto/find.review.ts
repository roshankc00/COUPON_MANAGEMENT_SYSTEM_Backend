import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindReviewDto {
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
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  couponId: number;

  @IsOptional()
  rating: number;

  @IsOptional()
  searchText: string;
}
