// phoneNumber
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class ChangeUserPhoneNumberDto {
  @ApiProperty({
    example: '9827489335',
    description: 'Provide the phoneNumber',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
