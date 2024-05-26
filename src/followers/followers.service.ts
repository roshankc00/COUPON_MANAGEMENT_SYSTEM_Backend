import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { Repository, EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
    private readonly entityManager: EntityManager,
    private readonly storeService: StoreService,
  ) {}
  async followUnfollow(createFollowerDto: CreateFollowerDto, user: User) {
    let followerlist = await this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('follower.stores', 'stores')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    if (!followerlist) {
      const newWishlist = new Follower({
        user: user,
        stores: [],
      });
      followerlist = await this.entityManager.save(newWishlist);
    }

    const store = await this.storeService.findOne(createFollowerDto.storeId);
    if (!store) {
      throw new NotFoundException('Store with this id doesnt exist');
    }

    const existingStoreIndex = followerlist.stores.findIndex(
      (item) => item.id === createFollowerDto.storeId,
    );

    if (existingStoreIndex !== -1) {
      followerlist.stores.splice(existingStoreIndex, 1);
    } else {
      followerlist.stores.push(store);
    }
    return {
      data: await this.entityManager.save(followerlist),
      message: `Item Added ${existingStoreIndex == -1 ? 'Followed ' : 'Unfollowed'} from Wishlist`,
    };
  }

  async getAllStoreOfUser(user: User) {
    return this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('follower.stores', 'stores')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
  }

  async remove(user: User) {
    const followerList = await this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
    return this.entityManager.remove(followerList);
  }
}
