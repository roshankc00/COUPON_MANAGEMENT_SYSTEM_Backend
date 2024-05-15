import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
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
    let wishlist = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.user', 'user')
      .leftJoinAndSelect('wishlist.coupons', 'coupons')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    if (!wishlist) {
      const newWishlist = new Wishlist({
        user: user,
        coupons: [],
      });
      wishlist = await this.entityManager.save(newWishlist);
    }
    const coupon = await this.couponService.findOne(createWishlistDto.couponId);

    if (!coupon) {
      throw new NotFoundException('Store with this id doesnt exist');
    }

    const existingCouponIndex = wishlist.coupons.findIndex(
      (item) => item.id === createWishlistDto.couponId,
    );

    if (existingCouponIndex !== -1) {
      wishlist.coupons.splice(existingCouponIndex, 1);
    } else {
      wishlist.coupons.push(coupon);
    }
    return await this.entityManager.save(wishlist);
  }

  async clearWishlist(user: User) {
    const wishlist = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    wishlist.coupons = [];
    return this.entityManager.save(wishlist);
  }

  async getAllWishlistData(user: User) {
    const wishlist = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.user', 'user')
      .leftJoinAndSelect('wishlist.coupons', 'coupons')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    return this.entityManager.save(wishlist);
  }
}
