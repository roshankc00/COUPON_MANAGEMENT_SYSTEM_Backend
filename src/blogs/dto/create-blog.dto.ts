import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateBlogListItemDto } from './createBlogItem.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    example: 'title----',
    description: 'Provide the title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'description--------------',
    description: 'Provide the description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '[]',
    description: 'provide the arrray of blof items',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlogListItemDto)
  items: CreateBlogListItemDto[];
}
