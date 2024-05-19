import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogListItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
