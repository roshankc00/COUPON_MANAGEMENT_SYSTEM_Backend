import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    const { licenseId, orderId, user } = createSubscriptionDto;
    const subscriber = new Subscription({
      licenseId: licenseId,
      orderId,
      user,
    });
    return this.subscriptionRepository.save(subscriber);
  }

  findAll() {
    return this.subscriptionRepository.find({});
  }

  findOne(id: number) {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const subscriberExist = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscriberExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(subscriberExist);
  }
  async getAllsubscriptionOfUser(user: User) {
    return this.subscriptionRepository
      .createQueryBuilder('subs')
      .leftJoinAndSelect('subs.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
}
