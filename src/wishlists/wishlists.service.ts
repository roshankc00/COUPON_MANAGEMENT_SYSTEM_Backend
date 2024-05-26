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
    return {
      data: await this.entityManager.save(wishlist),
      message: `Item Added ${existingCouponIndex == -1 ? 'Added ' : 'Removed'} from Wishlist`,
    };
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

  async getAllWishlistData(user: User, query: FindWishlistDto) {
    let wishlist;
    switch (query.status) {
      case WISHLIST_ENUM.active:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupons', 'coupons')
          .where('user.id = :userId', { userId: user.id })
          .andWhere('coupons.expireDate > :currentDate', {
            currentDate: new Date(),
          })
          .getOne();
        break;
      case WISHLIST_ENUM.expire:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupons', 'coupons')
          .where('user.id = :userId', { userId: user.id })
          .andWhere('coupons.expireDate < :currentDate', {
            currentDate: new Date(),
          })
          .getOne();
        break;
      case WISHLIST_ENUM.all:
        wishlist = await this.wishlistRepository
          .createQueryBuilder('wishlist')
          .leftJoinAndSelect('wishlist.user', 'user')
          .leftJoinAndSelect('wishlist.coupons', 'coupons')
          .where('user.id = :userId', { userId: user.id })
          .getOne();
    }
    return wishlist ? wishlist : [];
  }

  async couponExistInWishlist(couponId: number, user: User) {
    const data = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.user', 'user')
      .leftJoinAndSelect('wishlist.coupons', 'coupons')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    const itemExist = data?.coupons?.map((item) => item.id === couponId);
    return itemExist ? { exist: true } : { exist: false };
  }
}
