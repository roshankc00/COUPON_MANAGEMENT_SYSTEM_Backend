import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createPurchaseDto: CreatePurchaseDto, user: User) {
    const newPurchase = new Purchase({
      ...createPurchaseDto,
      user,
    });
    return this.entityManager.save(newPurchase);
  }

  findAll() {
    return this.purchaseRepository.find({
      relations: { user: true, coupon: true },
    });
  }

  findOne(id: number) {
    return this.purchaseRepository.findOne({
      where: { id },
      relations: { coupon: true, user: true },
    });
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchaseExist = await this.purchaseRepository.findOne({
      where: { id },
    });
    if (!purchaseExist) {
      throw new NotFoundException();
    }
    const newPurchase = Object.assign(purchaseExist, updatePurchaseDto);
    return this.entityManager.save(newPurchase);
  }

  async remove(id: number) {
    const purchaseExist = await this.purchaseRepository.findOne({
      where: { id },
    });
    if (!purchaseExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(purchaseExist);
  }

  async getAllPurchaseOfUser(user: User) {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.user', 'user')
      .leftJoinAndSelect('purchase.coupons', 'coupons')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
}
