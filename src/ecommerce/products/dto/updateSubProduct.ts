import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubProductTitleDto {
  @IsString()
  @IsNotEmpty()
  subProductTitle;
}
