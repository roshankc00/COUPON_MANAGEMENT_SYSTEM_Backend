import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty({
    example: 'roshan@gmail.com',
    description: 'Provide the email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Oldpassword',
    description: 'Provide the Oldpassword',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'Newpassword',
    description: 'Provide the Newpassword',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
