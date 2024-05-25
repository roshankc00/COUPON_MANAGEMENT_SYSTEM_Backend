import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogListItemDto {
  @ApiProperty({
    example: 'foods',
    description: 'Provide the title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'content---------',
    description: 'Provide the content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'true',
    description: 'Provide the isImage field',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isImage: boolean;
}
