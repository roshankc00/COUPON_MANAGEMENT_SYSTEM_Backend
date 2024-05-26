import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { EntityManager, Repository } from 'typeorm';
import { Seo } from '../../src/common/entity/Seo.entity';
import {
  GenerateAnalytics,
  MonthData,
} from '../../src/common/analytics/getAnalytics';
import { SearchDto } from './dto/search.dto';
import { CategoryService } from '../../src/category/category.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly entiryManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<Store>,
    private readonly categoryService: CategoryService,
  ) {}
  create(createStoreDto: CreateStoreDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
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
      imageName: file.filename,
    });
    return this.entiryManager.save(store);
  }

  findAll() {
    return this.storeRepository.find({
      relations: {
        coupons: true,
      },
      select: {
        coupons: {
          id: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.storeRepository.findOne({
      where: { id },
      relations: {
        seo: true,
        coupons: true,
        follower: {
          stores: true,
        },
      },
      select: {
        seo: {
          title: true,
          description: true,
        },
        coupons: {
          id: true,
        },
      },
    });
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
    file: Express.Multer.File,
  ) {
    const storeExist = await this.storeRepository.findOne({ where: { id } });
    if (!storeExist) {
      throw new UnauthorizedException();
    }

    let newStore;
    if (!file) {
      newStore = Object.assign(storeExist, updateStoreDto);
    } else {
      newStore = Object.assign(storeExist, {
        ...updateStoreDto,
        imageName: file.filename,
      });
    }
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

  async search({ searchText }: SearchDto) {
    const keyword = searchText;
    let stores;
    if (keyword) {
      stores = await this.storeRepository
        .createQueryBuilder('store')
        .where('LOWER(store.title) LIKE LOWER(:keyword)', {
          keyword: `%${keyword.toLowerCase()}%`,
        })
        .leftJoinAndSelect('store.coupons', 'coupons')
        .orderBy('store.createdAt', 'DESC')
        .getMany();
    } else {
      stores = await this.storeRepository
        .createQueryBuilder('store')
        .leftJoinAndSelect('store.coupons', 'coupons')
        .orderBy('store.createdAt', 'DESC')
        .take(5)
        .getMany();
    }
    const categories = await this.categoryService.search(keyword);
    return { categories, stores };
  }

  async getLateststore(no: number) {
    return this.storeRepository.find({
      order: {
        createdAt: 'desc',
      },
      take: no | 10,
    });
  }
}
