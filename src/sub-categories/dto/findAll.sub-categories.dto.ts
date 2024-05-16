import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class FindAllSubCategoryQueryDto {
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
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  categoryId: number;
}
