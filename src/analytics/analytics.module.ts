import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { UsersModule } from 'src/users/users.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { GenerateAnalytics } from 'src/common/analytics/last-12-month';
import { StoreModule } from 'src/store/store.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [UsersModule, CouponsModule, StoreModule, CategoryModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, GenerateAnalytics],
})
export class AnalyticsModule {}
