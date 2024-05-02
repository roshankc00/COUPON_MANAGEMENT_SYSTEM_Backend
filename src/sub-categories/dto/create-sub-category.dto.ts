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
  @IsNumber()
  categoryId: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;
}
