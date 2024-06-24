import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRODUCT_TYPE_ENUM } from 'src/common/enums/ecommerce.enum';
export class GetProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PRODUCT_TYPE_ENUM)
  product_type: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  no: number;
}
