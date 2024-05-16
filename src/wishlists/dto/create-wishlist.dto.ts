import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    example: 1,
    description: 'Provide the couponId ',
  })
  @IsNumber()
  @IsNotEmpty()
  couponId: number;
}
