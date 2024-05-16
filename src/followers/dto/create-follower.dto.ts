import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowerDto {
  @ApiProperty({
    example: 1,
    description: 'Provide the storeId you wana follow',
  })
  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}
