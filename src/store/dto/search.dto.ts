import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  searchText: string;
}
