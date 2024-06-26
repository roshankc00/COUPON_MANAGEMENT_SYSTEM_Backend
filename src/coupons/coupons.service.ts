import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { EntityManager, Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Seo } from '../../src/common/entity/Seo.entity';
import {
  GenerateAnalytics,
  MonthData,
} from '../../src/common/analytics/getAnalytics';
import { FindAllQueryDto } from './dto/findCoupon.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { StoreService } from 'src/store/store.service';
import { MESSAGE_QUEUE } from './constants';
import { FollowersService } from 'src/followers/followers.service';
import { AzureBulbStorageService } from 'src/common/blubstorage/blubstorage.service';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRespository: Repository<Coupon>,
    private readonly entityManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<Coupon>,
    private readonly storeService: StoreService,
    @InjectQueue(MESSAGE_QUEUE) private readonly messageQueue: Queue,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(createCouponDto: CreateCouponDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
    const seo = new Seo({
      title: createCouponDto.seo.title,
      description: createCouponDto.seo.description,
    });

    const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
    const isDeal = createCouponDto.isDeal.toString() == 'true';
    const coupon = new Coupon({
      title: createCouponDto.title,
      description: createCouponDto.description,
      tagLine: createCouponDto.tagLine,
      code: isDeal ? null : createCouponDto?.code,
      startDate: createCouponDto.startDate,
      expireDate: createCouponDto.expireDate,
      featured: createCouponDto.featured,
      categoryId: createCouponDto.categoryId,
      storeId: createCouponDto.storeId,
      subCategoryId: createCouponDto.subCategoryId,
      verified: createCouponDto.verified,
      exclusive: createCouponDto.exclusive,
      seo,
      status: createCouponDto.status,
      imageUrl: uploadedfile.imageUrl,
      bulbName: uploadedfile.blobName,
      isDeal: isDeal,
    });
    await this.messageQueue.add(
      {
        store: await this.storeService.getAllStoreFollower(
          createCouponDto.storeId,
        ),
      },
      {
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
        removeOnComplete: true,
      },
    );

    return this.entityManager.save(coupon);
  }

  findAll(query: FindAllQueryDto) {
    return this.filterCoupon(query);
  }

  findOne(id: number) {
    return this.couponRespository.findOne({
      where: { id },
      relations: [
        'category',
        'subCategory',
        'seo',
        'store',
        'store.affiliateLink',
      ],
    });
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto,
    file: Express.Multer.File,
  ) {
    const coupon = await this.couponRespository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });

    if (!coupon) {
      throw new NotFoundException();
    }

    let newCoupon: Coupon;
    if (!file) {
      newCoupon = Object.assign(coupon, updateCouponDto);
    } else {
      await this.azureBulbStorageService.deleteImage(coupon.bulbName);
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      newCoupon = Object.assign(coupon, {
        ...updateCouponDto,
        imageUrl: uploadedfile.imageUrl,
        bulbName: uploadedfile.blobName,
      });
    }

    return this.entityManager.save(newCoupon);
  }

  async remove(id: number) {
    const coupon = await this.couponRespository.findOne({
      where: { id },
      select: {
        bulbName: true,
        id: true,
      },
    });
    if (!coupon) {
      throw new NotFoundException();
    }
    await this.azureBulbStorageService.deleteImage(coupon.bulbName);
    return this.entityManager.remove(coupon);
  }

  async getCouponsAnalytics(): Promise<{
    last12Months: MonthData[];
  }> {
    return await this.generateAnalytics.getLast12MonthData(
      this.couponRespository,
    );
  }

  async countCoupons() {
    return this.couponRespository.count();
  }

  private async filterCoupon(query: FindAllQueryDto) {
    const {
      categoryId,
      page,
      pageSize,
      storeId,
      subCategoryIds,
      categoryIds,
      storeIds,
      subCategoryId,
    } = query;

    const queryBuilder = this.couponRespository.createQueryBuilder('coupon');

    if (categoryId) {
      queryBuilder.andWhere('coupon.categoryId = :categoryId', { categoryId });
    }
    if (storeId) {
      queryBuilder.andWhere('coupon.storeId = :storeId', { storeId });
    }
    if (subCategoryId) {
      queryBuilder.andWhere('coupon.subCategoryId = :subCategoryId', {
        subCategoryId,
      });
    }

    if (categoryIds) {
      const ids = categoryIds.toString().split(',').map(Number);
      if (ids.length === 1) {
        const newId = ids[0];
        queryBuilder.andWhere('coupon.categoryId = :newId', {
          newId,
        });
      } else {
        queryBuilder.andWhere('coupon.categoryId IN (:...ids)', { ids });
      }
    }

    if (subCategoryIds) {
      const ids = subCategoryIds.toString().split(',').map(Number);
      queryBuilder.andWhere('coupon.subCategoryId IN (:...ids)', { ids });
    }
    if (storeIds) {
      const ids = storeIds.toString().split(',').map(Number);
      queryBuilder.andWhere('coupon.storeId IN (:...ids)', { ids });
    }

    if (page && pageSize) {
      const totalItems = await queryBuilder.getCount();
      const totalPages = Math.ceil(totalItems / pageSize);
      if (query.page) {
        const skip = (+page - 1) * +pageSize;
        queryBuilder.skip(+skip).take(+pageSize);
      }
      return {
        coupons: await queryBuilder
          .leftJoinAndSelect('coupon.category', 'category')
          .leftJoinAndSelect('coupon.subCategory', 'subCategory')
          .leftJoinAndSelect('coupon.store', 'store')
          .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
          .leftJoinAndSelect('coupon.seo', 'seo')
          .select([
            'coupon.id',
            'coupon.title',
            'coupon.description',
            'coupon.imageUrl',
            'coupon.status',
            'coupon.code',
            'coupon.tagLine',
            'coupon.isDeal',
            'coupon.expireDate',
            'coupon.verified',
            'coupon.featured',
            'category.id',
            'category.title',
            'category.description',
            'subCategory.id',
            'subCategory.title',
            'subCategory.description',
            'store.id',
            'store.title',
            'store.description',
            'affiliateLink.id',
            'affiliateLink.link',
            'affiliateLink.tagLine',
            'affiliateLink.cashbackAmountPer',
            'seo.id',
            'seo.title',
            'seo.description',
          ])
          .getMany(),
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      return await queryBuilder
        .leftJoinAndSelect('coupon.category', 'category')
        .leftJoinAndSelect('coupon.subCategory', 'subCategory')
        .leftJoinAndSelect('coupon.store', 'store')
        .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
        .leftJoinAndSelect('coupon.seo', 'seo')
        .select([
          'coupon.id',
          'coupon.title',
          'coupon.description',
          'coupon.imageUrl',
          'coupon.status',
          'coupon.featured',
          'coupon.verified',
          'coupon.expireDate',
          'coupon.code',
          'coupon.isDeal',
          'coupon.tagLine',
          'category.id',
          'category.title',
          'category.description',
          'subCategory.id',
          'subCategory.title',
          'subCategory.description',
          'store.id',
          'store.title',
          'affiliateLink.id',
          'affiliateLink.link',
          'affiliateLink.tagLine',
          'affiliateLink.cashbackAmountPer',
          'store.description',
          'seo.id',
          'seo.title',
          'seo.description',
        ])
        .getMany();
    }
  }

  async getLatestCoupons(no: number = 10) {
    return this.couponRespository.find({
      relations: ['store', 'store.affiliateLink'],
      order: {
        createdAt: 'desc',
      },
      take: +no,
    });
  }

  async upload(file: Express.Multer.File) {
    return this.azureBulbStorageService.uploadImage(file);
  }
}
