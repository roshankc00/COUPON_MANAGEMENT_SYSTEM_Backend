import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class ResetPasswordDto {
  @ApiProperty({
    example: 'newPassword',
    description: 'Provide the newPassword',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
