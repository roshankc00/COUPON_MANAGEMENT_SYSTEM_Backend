import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Transform(({ value }) => {
    console.log(`Transforming isImage: ${value}`);
    return value === 'true' || value === true;
  })
  @IsBoolean()
  @IsNotEmpty()
  isImage: boolean;

  @Transform(({ value }) => {
    console.log(`Transforming isTooltipImage: ${value}`);
    return value === 'true' || value === true;
  })
  @IsBoolean()
  @IsNotEmpty()
  isTooltipImage: boolean;
}
