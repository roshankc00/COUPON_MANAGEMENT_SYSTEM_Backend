import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PRODUCT_TYPE_ENUM } from 'src/common/enums/ecommerce.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PRODUCT_TYPE_ENUM)
  product_type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
