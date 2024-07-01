import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRODUCT_TYPE_ENUM } from 'src/common/enums/ecommerce.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  appstoreLink: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  playstoreLink: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  tags: string[];

  fields: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PRODUCT_TYPE_ENUM)
  product_type: string;
}
