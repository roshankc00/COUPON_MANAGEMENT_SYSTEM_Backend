import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SeoDto } from 'src/common/dtos/seo.dto';
export class CreateCategoryDto {
  @ApiProperty({
    example: 'foods',
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
    example: true,
    description: 'Provide the showInMenu',
  })
  @IsBoolean()
  @IsNotEmpty()
  showInMenu: boolean;

  @ApiProperty({
    example: true,
    description: 'Provide the featured',
  })
  @IsBoolean()
  @IsNotEmpty()
  featured: boolean;

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
      description: 'desctiption',
    },
    description: 'Provide the object of title and description',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;
}
