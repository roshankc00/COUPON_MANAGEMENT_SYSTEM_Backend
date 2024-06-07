import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CouponsService } from 'src/coupons/coupons.service';
import { FindAllQueryDto } from 'src/coupons/dto/findCoupon.dto';
import { FindWishlistDto } from './dto/findAll.wishlist.coupons';
import { WISHLIST_ENUM } from 'src/common/enums/wishlist.status';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly entityManager: EntityManager,
    private readonly couponService: CouponsService,
  ) {}
  async addRemoveCoupons(createWishlistDto: CreateWishlistDto, user: User) {
    const wishlistItemExist = await this.wishlistRepository.findOne({
      where: {
        couponId: createWishlistDto.couponId,
        userId: user.id,
      },
    });
    if (wishlistItemExist) {
      const item = await this.entityManager.remove(wishlistItemExist);
      return {
        item,
        message: 'Coupon removed successfully',
      };
    } else {
      const item = new Wishlist({
        couponId: createWishlistDto.couponId,
        userId: user.id,
      });
      const newItem = await this.entityManager.save(item);
      return {
        message: 'Coupon added successfully',
        item: newItem,
      };
    }
  }

  async clearWishlist(user: User) {
    const wishlistItems = this.wishlistRepository.find({
      where: {
        userId: user.id,
      },
    });

    return this.entityManager.remove(wishlistItems);
  }

  async getAllWishlistData(user: User, query: FindWishlistDto) {
    let wishlist;
    switch (query.status) {
      case WISHLIST_ENUM.active:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupon', 'coupon')
          .leftJoinAndSelect('coupon.store', 'store')
          .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
          .where('user.id = :userId', { userId: user.id })
          .andWhere('coupon.expireDate > :currentDate', {
            currentDate: new Date(),
          })
          .getMany();
        break;
      case WISHLIST_ENUM.expire:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupon', 'coupon')
          .leftJoinAndSelect('coupon.store', 'store')
          .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
          .where('user.id = :userId', { userId: user.id })
          .andWhere('coupon.expireDate < :currentDate', {
            currentDate: new Date(),
          })
          .getMany();
        break;
      case WISHLIST_ENUM.all:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupon', 'coupon')
          .leftJoinAndSelect('coupon.store', 'store')
          .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
          .where('user.id = :userId', { userId: user.id })
          .getMany();
    }
    return wishlist ? wishlist : [];
  }

  async couponExistInWishlist(couponId: number, user: User) {
    const itemExist = await this.wishlistRepository.findOne({
      where: {
        couponId: couponId,
        userId: user.id,
      },
    });

    return itemExist ? { exist: true } : { exist: false };
  }
}
