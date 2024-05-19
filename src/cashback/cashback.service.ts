import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashbackDto } from './dto/create-cashback.dto';
import { UpdateCashbackDto } from './dto/update-cashback.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cashback } from './entities/cashback.entity';
import { EntityManager, Repository } from 'typeorm';
import { tree } from 'gulp';

@Injectable()
export class CashbackService {
  constructor(
    @InjectRepository(Cashback)
    private readonly cashbackRepository: Repository<Cashback>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createCashbackDto: CreateCashbackDto, user: User) {
    const newCashback = new Cashback({
      ...createCashbackDto,
      user,
    });
    return this.entityManager.save(newCashback);
  }

  findAll() {
    return this.cashbackRepository.findOne({
      relations: { coupon: true, user: true },
    });
  }

  findOne(id: number) {
    return this.cashbackRepository.findOne({
      where: { id },
      relations: { coupon: true, user: true },
    });
  }

  async update(id: number, updateCashbackDto: UpdateCashbackDto) {
    const cashbackExist = await this.cashbackRepository.findOne({
      where: { id },
    });
    if (!cashbackExist) {
      throw new NotFoundException();
    }
    const updCashback = Object.assign(cashbackExist, updateCashbackDto);
    return this.entityManager.save(updCashback);
  }

  async remove(id: number) {
    const cashbackExist = await this.cashbackRepository.findOne({
      where: { id },
    });
    if (!cashbackExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(cashbackExist);
  }
}
