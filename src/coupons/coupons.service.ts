import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
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
import { STATUS_ENUM } from 'src/common/enums/status.enum';
import slugify from 'slugify';
import { GetDataWithSlugDto } from 'src/common/dtos/getwithslug.dto';

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
      dealLink: isDeal ? createCouponDto?.dealLink : null,
      startDate: createCouponDto.startDate,
      expireDate: createCouponDto.expireDate,
      slug: slugify(createCouponDto.slug),
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

  async findOne(id: number) {
    const coupon = await this.couponRespository.findOne({
      where: { id },
      relations: [
        'category',
        'subCategory',
        'seo',
        'store',
        'store.affiliateLink',
      ],
    });
    if (!coupon) {
      throw new NotFoundException();
    }
    return coupon;
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

    if (updateCouponDto?.slug) {
      updateCouponDto.slug = slugify(updateCouponDto.slug);
    }
    if (!coupon) {
      throw new NotFoundException();
    }

    let newCoupon: Coupon;
    if (!file) {
      newCoupon = Object.assign(coupon, updateCouponDto);
    } else {
      if (coupon?.bulbName) {
        await this.azureBulbStorageService.deleteImage(coupon.bulbName);
      }
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      newCoupon = Object.assign(coupon, {
        ...updateCouponDto,
        imageUrl: uploadedfile.imageUrl,
        bulbName: uploadedfile.blobName,
      });
    }

    newCoupon.updatedAt = new Date();

    return this.entityManager.save(newCoupon);
  }

  async remove(id: number) {
    try {
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
      await this.couponRespository.delete(coupon);

      if (coupon?.bulbName) {
        await this.azureBulbStorageService.deleteImage(coupon.bulbName);
      }
      return {
        success: true,
        message: 'Coupon Deleted successfully',
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('You Cant delete it  ');
      } else {
        throw error;
      }
    }
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

  async filterCoupon(query: FindAllQueryDto) {
    const {
      categoryId,
      page,
      pageSize,
      storeId,
      subCategoryIds,
      categoryIds,
      storeIds,
      subCategoryId,
      categorySlug,
      storeSlug,
    } = query;

    const queryBuilder = this.couponRespository
      .createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.category', 'category')
      .leftJoinAndSelect('category.subcategories', 'subCategory')
      .leftJoinAndSelect('coupon.store', 'store')
      .leftJoinAndSelect('store.affiliateLink', 'affiliateLink')
      .leftJoinAndSelect('coupon.seo', 'seo');

    queryBuilder.where('coupon.status = :status', {
      status: STATUS_ENUM.enabled,
    });

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
      queryBuilder.andWhere('coupon.categoryId IN (:...categoryIds)', {
        categoryIds,
      });
    }

    if (subCategoryIds) {
      queryBuilder.andWhere('subCategory.id IN (:...subCategoryIds)', {
        subCategoryIds,
      });
    }
    if (storeIds) {
      queryBuilder.andWhere('coupon.storeId IN (:...storeIds)', { storeIds });
    }

    if (categorySlug) {
      queryBuilder.andWhere('category.slug = :categorySlug', { categorySlug });
    }

    if (storeSlug) {
      queryBuilder.andWhere('store.slug = :storeSlug', { storeSlug });
    }

    const selectFields = [
      'coupon.id',
      'coupon.title',
      'coupon.description',
      'coupon.imageUrl',
      'coupon.status',
      'coupon.featured',
      'coupon.verified',
      'coupon.expireDate',
      'coupon.code',
      'coupon.slug',
      'coupon.isDeal',
      'coupon.tagLine',
      'coupon.dealLink',
      'category.id',
      'category.title',
      'category.slug',
      'category.description',
      'subCategory.id',
      'subCategory.title',
      'subCategory.description',
      'coupon.updatedAt',
      'store.id',
      'store.title',
      'store.slug',
      'affiliateLink.id',
      'affiliateLink.link',
      'affiliateLink.tagLine',
      'affiliateLink.cashbackAmountPer',
      'store.description',
      'seo.id',
      'seo.title',
      'seo.description',
    ];

    queryBuilder.select(selectFields).orderBy('coupon.updatedAt', 'DESC');

    if (page && pageSize) {
      const totalItems = await queryBuilder.getCount();
      const totalPages = Math.ceil(totalItems / pageSize);
      const skip = (+page - 1) * +pageSize;

      const coupons = await queryBuilder.skip(skip).take(+pageSize).getMany();

      return {
        coupons,
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      const coupons = await queryBuilder.getMany();
      return coupons;
    }
  }

  async getLatestCoupons(no: number = 10) {
    return this.couponRespository.find({
      where: {
        status: STATUS_ENUM.enabled,
      },
      relations: ['store', 'store.affiliateLink'],
      order: {
        createdAt: 'desc',
      },
      take: +no,
    });
  }

  async getCouponWithSlug(getDataWithSlugDto: GetDataWithSlugDto) {
    const { slug } = getDataWithSlugDto;
    const coupon = await this.couponRespository.findOne({
      where: { slug },
      relations: [
        'category',
        'subCategory',
        'seo',
        'store',
        'store.affiliateLink',
      ],
    });
    if (!coupon) {
      throw new NotFoundException();
    }
    return coupon;
  }
}
