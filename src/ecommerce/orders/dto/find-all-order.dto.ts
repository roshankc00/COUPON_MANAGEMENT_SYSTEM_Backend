import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';

export class FindAllOrderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ORDER_STATUS_ENUM)
  status: string;
}
