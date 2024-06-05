import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { CustomLoggerModule } from './common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { StoreModule } from './store/store.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { CouponsModule } from './coupons/coupons.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { FaqsModule } from './faqs/faqs.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { FollowersModule } from './followers/followers.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';

import { join } from 'path';
import { AppController } from './app.controller';
import { ReviewModule } from './review/review.module';
import { FeedbackModule } from './feedback/feedback.module';
import { BlogsModule } from './blogs/blogs.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CashbackModule } from './cashback/cashback.module';

import { AffiliateLinkModule } from './affiliate-link/affiliate-link.module';
import { SubmitOfferModule } from './submit-offer/submit-offer.module';
import { PassportModule } from '@nestjs/passport';
import { CronsModule } from './taskSheduling/crons.module';
import { HomeModule } from './home/home.module';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './coupons/processor/coupon.consumer';
import { ProductsModule } from './ecommerce/products/products.module';
import { OrdersModule } from './ecommerce/orders/orders.module';
import { LicenseModule } from './ecommerce/license/license.module';
import { PaymentSolutionModule } from './ecommerce/payment-solution/payment-solution.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../images'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    CustomLoggerModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    StoreModule,
    SubCategoriesModule,
    CouponsModule,
    AnalyticsModule,
    FaqsModule,
    WishlistsModule,
    FollowersModule,
    ReviewModule,
    FeedbackModule,
    BlogsModule,
    PurchaseModule,
    CashbackModule,
    AffiliateLinkModule,
    SubmitOfferModule,
    CronsModule,
    HomeModule,
    ProductsModule,
    OrdersModule,
    LicenseModule,
    PaymentSolutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
