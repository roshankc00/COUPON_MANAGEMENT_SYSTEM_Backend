import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  @IsNotEmpty()
  isImage: boolean;
  @IsBoolean()
  @IsNotEmpty()
  isTooltipImage: boolean;
}
