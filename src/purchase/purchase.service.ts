import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CashbackService } from 'src/cashback/cashback.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly entityManager: EntityManager,
    private readonly cashBackService: CashbackService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto, user: User) {
    const newPurchase = new Purchase({
      ...createPurchaseDto,
      user,
    });
    const cashBack = this.calculateCashbackHandler(createPurchaseDto.amount);
    await this.cashBackService.create(
      {
        couponId: createPurchaseDto.couponId,
        amount: this.calculateCashbackHandler(createPurchaseDto.amount),
      },
      user,
    );
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

  private calculateCashbackHandler(amount: number) {
    return (20 / 100) * amount;
  }
}
