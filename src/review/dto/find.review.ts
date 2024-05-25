import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindReviewDto {
  @ApiProperty({
    example: '1',
    description: 'Provide the page',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page: number;

  @ApiProperty({
    example: '10',
    description: 'Provide the pageSize',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  pageSize: number;

  @ApiProperty({
    example: '1',
    description: 'Provide the coupon Id',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  couponId: number;

  @ApiProperty({
    example: '3',
    description: 'Provide the rating(optional)',
  })
  @IsOptional()
  rating: number;

  @ApiProperty({
    example: 'a---',
    description: 'Provide the searchText(optional)',
  })
  @IsOptional()
  searchText: string;
}
