import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WISHLIST_ENUM } from 'src/common/enums/wishlist.status';

export class FindWishlistDto {
  @IsNotEmpty()
  @IsEnum(WISHLIST_ENUM)
  status: string;
}
