import { PartialType } from '@nestjs/swagger';
import { CreateSubProductDto } from './create-sub-product.dto';

export class UpdateSubProductDto extends PartialType(CreateSubProductDto) {}
