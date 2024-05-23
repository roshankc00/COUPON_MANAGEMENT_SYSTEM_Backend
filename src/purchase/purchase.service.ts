import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CashbackService } from 'src/cashback/cashback.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly entityManager: EntityManager,
    private readonly cashBackService: CashbackService,
    private readonly userService: UsersService,
  ) {}

  async create(transaction: any) {
    const { amount, userId, ref } = transaction;
    const purchaseExist = await this.purchaseRepository.findOne({
      where: {
        transactionId: transaction.id,
      },
    });
    if (purchaseExist) {
      throw new BadRequestException('Purchase with this already exist');
    }
    const user = await this.userService.findOne(+userId);
    const newPurchase = new Purchase({
      user,
      amount,
      transactionId: transaction?.id,
    });
    const purchase = await this.entityManager.save(newPurchase);

    await this.cashBackService.create(
      {
        amount: this.calculateCashbackHandler(amount),
        purchaseId: purchase.id,
      },
      user,
    );
  }

  findAll() {
    return this.purchaseRepository.find({
      relations: { user: true, affiliateLink: true },
    });
  }

  findOne(id: number) {
    return this.purchaseRepository.findOne({
      where: { id },
      relations: { affiliateLink: true, user: true },
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
      .leftJoinAndSelect('purchase.affiliateLink', 'affiliateLink')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  private calculateCashbackHandler(amount: number) {
    return (20 / 100) * amount;
  }
}
