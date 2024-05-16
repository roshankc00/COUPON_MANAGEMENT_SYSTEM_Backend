import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WISHLIST_ENUM } from 'src/common/enums/wishlist.status';

export class FindWishlistDto {
  @ApiProperty({
    example: 'active',
    description:
      'Provide the status will return coupons of that status present in your wishlists  (active all expired) ',
  })
  @IsNotEmpty()
  @IsEnum(WISHLIST_ENUM)
  status: string;
}
