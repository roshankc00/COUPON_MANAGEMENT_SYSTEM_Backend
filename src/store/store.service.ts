import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { AzureBulbStorageService } from 'src/common/blubstorage/blubstorage.service';
import { STATUS_ENUM } from 'src/common/enums/status.enum';
import slugify from 'slugify';
import { GetDataWithSlugDto } from 'src/common/dtos/getwithslug.dto';
@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly entiryManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<Store>,
    private readonly categoryService: CategoryService,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(createStoreDto: CreateStoreDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
    const seo = new Seo({
      description: createStoreDto.seo.description,
      title: createStoreDto.seo.title,
    });
    const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
    const store = new Store({
      title: createStoreDto.title,
      description: createStoreDto.description,
      featured: createStoreDto.featured,
      seo,
      slug: slugify(createStoreDto.slug),
      status: createStoreDto.status,
      imageUrl: uploadedfile.imageUrl,
      bulbName: uploadedfile.blobName,
    });
    return this.entiryManager.save(store);
  }

  findAll() {
    return this.storeRepository.find({
      where: {
        status: STATUS_ENUM.enabled,
      },
      relations: {
        coupons: true,
        affiliateLink: true,
        seo: true,
      },
      select: {
        coupons: {
          id: true,
        },
        affiliateLink: {
          id: true,
          link: true,
          tagLine: true,
          cashbackAmountPer: true,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  findAllForAdmin() {
    return this.storeRepository.find({
      where: {},
      relations: {
        coupons: true,
        affiliateLink: true,
        seo: true,
      },
      select: {
        coupons: {
          id: true,
        },
        affiliateLink: {
          id: true,
          link: true,
          tagLine: true,
          cashbackAmountPer: true,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }
  async findOne(id: number) {
    const store = await this.storeRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.coupons', 'coupon')
      .leftJoinAndSelect('store.followers', 'follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
      .leftJoinAndSelect('store.seo', 'seo')
      .select([
        'store',
        'coupon.id',
        'follower.id',
        'user.id',
        'affiliateLink',
        'seo.title',
        'seo.description',
      ])
      .where('store.id = :id', {
        id,
      })
      .getOne();
    if (!store) {
      throw new NotFoundException();
    }
    return store;
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
    file: Express.Multer.File,
  ) {
    const storeExist = await this.storeRepository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });
    if (!storeExist) {
      throw new UnauthorizedException();
    }

    let newStore;
    if (!file) {
      newStore = Object.assign(storeExist, updateStoreDto);
    } else {
      await this.azureBulbStorageService.deleteImage(storeExist.bulbName);
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      newStore = Object.assign(storeExist, {
        ...updateStoreDto,
        imageUrl: uploadedfile.imageUrl,
        bulbName: uploadedfile.blobName,
      });
    }
    newStore.updatedAt = new Date();
    return this.entiryManager.save(newStore);
  }

  async remove(id: number) {
    const storeExist = await this.storeRepository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });
    if (!storeExist) {
      throw new UnauthorizedException();
    }

    await this.entiryManager.remove(storeExist);
    if (storeExist?.bulbName) {
      await this.azureBulbStorageService.deleteImage(storeExist.bulbName);
    }
    return {
      success: true,
      message: 'Deleted successfully',
    };
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

  async getLateststore(no: number = 4) {
    return this.storeRepository.find({
      where: {
        status: STATUS_ENUM.enabled,
      },
      relations: { affiliateLink: true },
      order: {
        createdAt: 'desc',
      },
      take: +no,
    });
  }

  async getAllStoreFollower(storeId: number) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId, status: STATUS_ENUM.enabled },
      relations: ['followers', 'followers.user'],
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    return store;
  }

  async getStoreWithSlug(getDataWithSlugDto: GetDataWithSlugDto) {
    const { slug } = getDataWithSlugDto;
    const store = await this.storeRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.coupons', 'coupon')
      .leftJoinAndSelect('store.followers', 'follower')
      .leftJoinAndSelect('follower.user', 'user')
      .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
      .leftJoinAndSelect('store.seo', 'seo')
      .select([
        'store',
        'coupon.id',
        'follower.id',
        'user.id',
        'affiliateLink',
        'seo.title',
        'seo.description',
      ])
      .where('store.slug = :slug', {
        slug,
      })
      .getOne();
    if (!store) {
      throw new NotFoundException();
    }
    return store;
  }
}
