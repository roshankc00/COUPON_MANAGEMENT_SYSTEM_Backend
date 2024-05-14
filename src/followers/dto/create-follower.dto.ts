import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowerDto {
  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}
