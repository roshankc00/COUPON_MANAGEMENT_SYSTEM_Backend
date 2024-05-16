import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    example: 'fo',
    description: 'Provide the string by which you wana search store',
  })
  @IsString()
  @IsOptional()
  searchText: string;
}
