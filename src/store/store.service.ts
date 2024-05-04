import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { EntityManager, Repository } from 'typeorm';
import { Seo } from 'src/common/entity/Seo.entity';
import {
  GenerateAnalytics,
  MonthData,
} from 'src/common/analytics/last-12-month';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly entiryManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<Store>,
  ) {}
  create(createStoreDto: CreateStoreDto) {
    const seo = new Seo({
      description: createStoreDto.seo.description,
      title: createStoreDto.seo.title,
    });
    const store = new Store({
      title: createStoreDto.title,
      description: createStoreDto.description,
      featured: createStoreDto.featured,
      seo,
      status: createStoreDto.status,
    });
    return this.entiryManager.save(store);
  }

  findAll() {
    return this.storeRepository.find({});
  }

  findOne(id: number) {
    return this.storeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const storeExist = await this.storeRepository.findOne({ where: { id } });
    if (!storeExist) {
      throw new UnauthorizedException();
    }
    const newStore = Object.assign(storeExist, updateStoreDto);
    return this.entiryManager.save(newStore);
  }

  async remove(id: number) {
    const storeExist = await this.storeRepository.findOne({ where: { id } });
    if (!storeExist) {
      throw new UnauthorizedException();
    }
    return this.entiryManager.remove(storeExist);
  }

  async getCouponsAnalytics(): Promise<{
    last12Months: MonthData[];
  }> {
    return await this.generateAnalytics.getLast12MonthData(
      this.storeRepository,
    );
  }

  async countStore() {
    return this.storeRepository.count();
  }
}
