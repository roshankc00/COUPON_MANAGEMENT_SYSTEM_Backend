import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class UserSignupDto {
  @ApiProperty({
    example: 'Name',
    description: 'Name of  user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'roshan@gmail.com',
    description: 'Provide the email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Provide the password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
