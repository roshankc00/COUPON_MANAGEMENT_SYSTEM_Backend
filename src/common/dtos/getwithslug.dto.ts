import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class GetDataWithSlugDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
