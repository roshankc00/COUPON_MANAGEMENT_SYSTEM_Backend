import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { FindWishlistDto } from './dto/findAll.wishlist.coupons';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @ApiOperation({
    summary:
      'add the coupon to wishlist if coupon   already exists then  remove   it from wishlist',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the  added or removed coupon details ',
  })
  @Post('add-remove')
  @UseGuards(JWtAuthGuard)
  addRemoveCoupons(
    @Body() createWishlistDto: CreateWishlistDto,
    @Currentuser() user: User,
  ) {
    return this.wishlistsService.addRemoveCoupons(createWishlistDto, user);
  }

  @ApiOperation({
    summary: 'remove   all the coupons from wishlist  ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  removed coupons store details ',
  })
  @Patch('remove-all-coupons/:id')
  @UseGuards(JWtAuthGuard)
  clearWishlist(@Currentuser() user: User) {
    return this.wishlistsService.clearWishlist(user);
  }

  @ApiOperation({
    summary: 'get all the wishlist coupons of the user ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  wishlist coupons details ',
  })
  @Get('my')
  @UseGuards(JWtAuthGuard)
  getAllWishlistData(
    @Currentuser() user: User,
    @Query() query: FindWishlistDto,
  ) {
    return this.wishlistsService.getAllWishlistData(user, query);
  }

  @UseGuards(JWtAuthGuard)
  @Get('coupon/exist')
  couponExistInWishlist(
    @Query('couponId') couponId: string,
    @Currentuser() user: User,
  ) {
    return this.wishlistsService.couponExistInWishlist(+couponId, user);
  }
}
