import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CategoryService } from 'src/category/category.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { StoreService } from 'src/store/store.service';
import { EntityManager, Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Seo } from 'src/common/entity/Seo.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRespository: Repository<Coupon>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCouponDto: CreateCouponDto) {
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
}
