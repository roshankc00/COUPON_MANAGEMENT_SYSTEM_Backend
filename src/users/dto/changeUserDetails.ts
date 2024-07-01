import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserNameDetail {
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
