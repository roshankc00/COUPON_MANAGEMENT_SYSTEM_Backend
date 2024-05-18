import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SeoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'seo title must be of atleast   3 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'seo description must be of atleast   10 characters',
  })
  description: string;
}
