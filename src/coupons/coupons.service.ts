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

  findAll() {
    return this.couponRespository.find({
      relations: {
        category: true,
        seo: true,
        subCategory: true,
        store: true,
      },
      select: {
        category: {
          id: true,
          title: true,
        },
        subCategory: {
          id: true,
          title: true,
        },
        store: {
          id: true,
          title: true,
        },
        seo: {
          id: true,
          title: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.couponRespository.findOne({ where: { id } });
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
}
