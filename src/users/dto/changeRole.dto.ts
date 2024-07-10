import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class ChangeUserROleDto {
  @ApiProperty({
    example: 'newPassword',
    description: 'Provide the newPassword',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
