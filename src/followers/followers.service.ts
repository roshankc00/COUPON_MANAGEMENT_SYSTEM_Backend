import { BadRequestException, Injectable } from '@nestjs/common';
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
    let followerList = await this.followerRepository.findOne({
      where: {
        user: user,
      },
      relations: {
        stores: true,
      },
    });
    const store = await this.storeService.findOne(createFollowerDto.storeId);
    if (!followerList) {
      const newFollowerList = new Follower({
        user,
        stores: [store],
      });
      return this.entityManager.save(newFollowerList);
    } else {
      const itemExist = followerList.stores.find(
        (item) => item.id === createFollowerDto.storeId,
      );
      if (itemExist) {
        const newfollowers = followerList.stores.filter(
          (item) => item.id !== createFollowerDto.storeId,
        );
        followerList.stores = newfollowers;
      } else {
        followerList.stores = [...followerList.stores, store];
      }
      return this.entityManager.save(followerList);
    }
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
