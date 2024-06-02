import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { Repository, EntityManager, W } from 'typeorm';
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
    const { storeId } = createFollowerDto;

    const followerExist = await this.followerRepository.findOne({
      where: {
        storeId,
        userId: user.id,
      },
    });
    if (followerExist) {
      return this.entityManager.remove(followerExist);
    } else {
      const follower = new Follower({
        storeId,
        userId: user.id,
      });
      return this.entityManager.save(follower);
    }
  }

  async getAllStoreOfUser(user: User) {
    return this.followerRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  async remove(user: User) {
    const followerList = this.followerRepository.find({
      where: {
        userId: user.id,
      },
    });

    return this.entityManager.remove(followerList);
  }
}
