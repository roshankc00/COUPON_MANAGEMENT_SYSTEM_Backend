import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly entityManager: EntityManager,
    private readonly couponService: CouponsService,
  ) {}
  async addRemoveCoupons(createWishlistDto: CreateWishlistDto, user: User) {
    const wishlists = await this.wishlistRepository.findOne({
      where: { user },
      relations: {
        coupons: true,
      },
    });
    const coupon = await this.couponService.findOne(createWishlistDto.couponId);
    if (wishlists && wishlists.coupons.length > 0) {
      const itemExist = wishlists.coupons.find(
        (item) => (item.id = createWishlistDto.couponId),
      );
      if (itemExist) {
        const remItems = wishlists.coupons.filter(
          (item) => item.id !== createWishlistDto.couponId,
        );
        wishlists.coupons = remItems;
      } else {
        wishlists.coupons = [...wishlists.coupons, coupon];
      }
      await this.entityManager.save(wishlists);
    } else {
      const newWishlist = new Wishlist({
        user: user,
        coupons: [coupon],
      });
      return this.entityManager.save(newWishlist);
    }
  }

  async clearWishlist(user: User) {
    const wishlists = await this.wishlistRepository.findOne({
      where: { user },
    });

    await this.entityManager.remove(wishlists);
  }
}
