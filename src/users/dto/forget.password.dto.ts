import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'roshan@gmail.com',
    description: 'Provide the email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
