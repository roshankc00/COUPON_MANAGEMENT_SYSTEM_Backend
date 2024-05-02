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
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoriesService,
    private readonly storeService: StoreService,
    @InjectRepository(Coupon)
    private readonly couponRespository: Repository<Coupon>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCouponDto: CreateCouponDto) {
    const categoryExist = await this.categoryService.findOne(
      createCouponDto.categoryId,
    );
    const subCategoryExist = await this.subCategoryService.findOne(
      createCouponDto.subCategoryId,
    );
    const storeExist = await this.storeService.findOne(createCouponDto.storeId);
    const seo = new Seo({
      title: createCouponDto.seo.title,
      description: createCouponDto.seo.description,
    });
    if (!categoryExist || !subCategoryExist || !storeExist) {
      throw new NotFoundException();
    }

    const coupon = new Coupon({
      title: createCouponDto.title,
      description: createCouponDto.description,
      tagLine: createCouponDto.tagLine,
      code: createCouponDto.code,
      startDate: createCouponDto.startDate,
      expireDate: createCouponDto.expireDate,
      url: createCouponDto.url,
      featured: createCouponDto.featured,
      category: categoryExist,
      subCategory: subCategoryExist,
      store: storeExist,
      verified: createCouponDto.verified,
      exclusive: createCouponDto.exclusive,
      seo,
      status: createCouponDto.status,
    });
    return this.entityManager.save(coupon);
  }

  findAll() {
    // todo:pagination
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
    if (updateCouponDto.categoryId) {
      const newCat = await this.categoryService.findOne(
        updateCouponDto.categoryId,
      );
      coupon.category = newCat;
    }
    if (updateCouponDto.storeId) {
      const newStore = await this.storeService.findOne(updateCouponDto.storeId);
      coupon.store = newStore;
    }
    if (updateCouponDto.subCategoryId) {
      const newSubCat = await this.subCategoryService.findOne(
        updateCouponDto.subCategoryId,
      );
      coupon.subCategory = newSubCat;
    }

    const newCoupon = Object.assign(coupon, updateCouponDto);
    return this.entityManager.save(newCoupon);
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
