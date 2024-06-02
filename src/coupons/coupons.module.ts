import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { StoreModule } from 'src/store/store.module';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { GenerateAnalytics } from 'src/common/analytics/getAnalytics';
import { BullModule } from '@nestjs/bull';
import { MESSAGE_QUEUE } from './constants.ts';
import { MessageConsumer } from './processor/coupon.consumer';
import { StoreService } from 'src/store/store.service';
import { FollowersModule } from 'src/followers/followers.module';
import { EmailModule } from 'src/common/email/email.module';
import { Store } from 'src/store/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    StoreModule,
    BullModule.registerQueue({
      name: MESSAGE_QUEUE,
    }),
    EmailModule,
  ],
  controllers: [CouponsController],
  providers: [CouponsService, GenerateAnalytics, MessageConsumer],
  exports: [CouponsService],
})
export class CouponsModule {}
