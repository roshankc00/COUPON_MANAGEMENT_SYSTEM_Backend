import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class DeactivateUserDto {
  @ApiProperty({
    example: 'newPassword',
    description: 'Provide the newPassword',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
