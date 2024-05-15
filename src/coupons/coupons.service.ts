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
} from '../../src/common/analytics/last-12-month';
import { FindAllQueryDto } from './dto/findCoupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRespository: Repository<Coupon>,
    private readonly entityManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<Coupon>,
  ) {}
  async create(createCouponDto: CreateCouponDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
    const seo = new Seo({
      title: createCouponDto.seo.title,
      description: createCouponDto.seo.description,
    });
    const coupon = new Coupon({
      title: createCouponDto.title,
      description: createCouponDto.description,
      tagLine: createCouponDto.tagLine,
      code: createCouponDto.code,
      startDate: createCouponDto.startDate,
      expireDate: createCouponDto.expireDate,
      url: createCouponDto.url,
      featured: createCouponDto.featured,
      categoryId: createCouponDto.categoryId,
      storeId: createCouponDto.storeId,
      subCategoryId: createCouponDto.subCategoryId,
      verified: createCouponDto.verified,
      exclusive: createCouponDto.exclusive,
      seo,
      status: createCouponDto.status,
      imageName: file.filename,
    });
    return this.entityManager.save(coupon);
  }

  findAll(query: FindAllQueryDto) {
    return this.filterCoupon(query);
  }

  findOne(id: number) {
    return this.couponRespository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRespository.findOne({ where: { id } });

    if (!coupon) {
      throw new NotFoundException();
    }

    const newCoupon = Object.assign(coupon, updateCouponDto);
    return this.entityManager.save(newCoupon);
  }

  async remove(id: number) {
    const coupon = await this.couponRespository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException();
    }
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
    const { categoryId, page, pageSize, storeId, subCategoryIds } = query;
    console.log(query);
    const queryBuilder = this.couponRespository.createQueryBuilder('coupon');
    if (categoryId) {
      queryBuilder.andWhere('coupon.categoryId = :categoryId', { categoryId });
    }
    if (storeId) {
      queryBuilder.andWhere('coupon.storeId = :storeId', { storeId });
    }
    if (subCategoryIds) {
      const ids = query.subCategoryIds.toString().split(',').map(Number);
      queryBuilder.andWhere('coupon.subCategoryId IN (:...ids)', {
        ids,
      });
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
          .leftJoinAndSelect('coupon.seo', 'seo')
          .select([
            'coupon.id',
            'coupon.title',
            'coupon.description',
            'coupon.imageName',
            'category.id',
            'category.title',
            'category.description',
            'subCategory.id',
            'subCategory.title',
            'subCategory.description',
            'store.id',
            'store.title',
            'store.description',
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
        .leftJoinAndSelect('coupon.seo', 'seo')
        .select([
          'coupon.id',
          'coupon.title',
          'coupon.description',
          'coupon.imageName',
          'category.id',
          'category.title',
          'category.description',
          'subCategory.id',
          'subCategory.title',
          'subCategory.description',
          'store.id',
          'store.title',
          'store.description',
          'seo.id',
          'seo.title',
          'seo.description',
        ])
        .getMany();
    }
  }
}
