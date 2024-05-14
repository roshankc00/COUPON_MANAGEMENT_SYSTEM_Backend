import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Currentuser } from 'src/common/decorators/current.user.decorator';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post('add-remove')
  @UseGuards(JWtAuthGuard)
  addRemoveCoupons(
    @Body() createWishlistDto: CreateWishlistDto,
    @Currentuser() user: User,
  ) {
    return this.wishlistsService.addRemoveCoupons(createWishlistDto, user);
  }

  @Patch('remove-all-coupons/:id')
  @UseGuards(JWtAuthGuard)
  clearWishlist(@Param('id') id: string) {
    return this.wishlistsService.clearWishlist(+id);
  }
}
