import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class ToggleProductStatusDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
