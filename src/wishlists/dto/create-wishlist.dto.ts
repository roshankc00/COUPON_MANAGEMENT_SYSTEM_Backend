import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @IsNumber()
  @IsNotEmpty()
  couponId: number;
}
