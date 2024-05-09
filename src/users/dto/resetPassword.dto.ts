import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
