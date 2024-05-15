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
    let followerList = await this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('follower.stores', 'stores')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    if (!followerList) {
      const newFollowerList = new Follower({
        user,
        stores: [],
      });
      followerList = await this.entityManager.save(newFollowerList);
    }
    const store = await this.storeService.findOne(createFollowerDto.storeId);
    if (!store) {
      throw new NotFoundException('Store with this id doesnt exist');
    }

    const existingStoreIndex = followerList.stores.findIndex(
      (item) => item.id === createFollowerDto.storeId,
    );

    if (existingStoreIndex !== -1) {
      followerList.stores.splice(existingStoreIndex, 1);
    } else {
      followerList.stores.push(store);
    }
    return this.entityManager.save(followerList);
  }

  async getAllStoreOfUser(user: User) {
    return this.followerRepository
      .createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('follower.stores', 'stores')
      .leftJoinAndSelect('stores.coupons', 'coupons')
      .where('user.id = :userId', { userId: user.id })
      .getOne();
  }

  async remove(user: User) {
    const followerList = await this.followerRepository.findOne({
      where: {
        user,
      },
    });
    return this.entityManager.remove(followerList);
  }
}
