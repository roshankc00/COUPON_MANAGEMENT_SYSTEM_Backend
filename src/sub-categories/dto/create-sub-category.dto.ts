import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SeoDto } from 'src/common/dtos/seo.dto';
export class CreateSubCategoryDto {
  @ApiProperty({
    example: 'subcategoryName',
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
    example: 2,
    description: 'Provide the categoryId',
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: true,
    description: 'Provide the status',
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

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
}
