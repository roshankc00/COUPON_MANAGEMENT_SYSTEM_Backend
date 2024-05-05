import { Injectable } from '@nestjs/common';
import { CouponsService } from 'src/coupons/coupons.service';
import { UsersService } from 'src/users/users.service';
import { StoreService } from '../store/store.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly userService: UsersService,
    private readonly couponsService: CouponsService,
    private readonly storeService: StoreService,
    private readonly categoryService: CategoryService,
  ) {}
  async getUserAnalytics() {
    return await this.userService.getUserAnalytics();
  }
  async getStoreAnalytics() {
    return await this.storeService.getCouponsAnalytics();
  }
  async getCouponsAnalytics() {
    return await this.couponsService.getCouponsAnalytics();
  }
  async getAllCounts() {
    return {
      stores: await this.storeService.countStore(),
      coupons: await this.couponsService.countCoupons(),
      users: await this.userService.countUsers(),
      categories: await this.categoryService.countCategories(),
    };
  }
}
