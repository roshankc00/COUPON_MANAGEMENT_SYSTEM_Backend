import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { StoreModule } from 'src/store/store.module';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    CategoryModule,
    SubCategoriesModule,
    StoreModule,
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
