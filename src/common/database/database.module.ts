import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'typeorm.config';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AffiliateLink } from 'src/affiliate-link/entities/affiliate-link.entity';
import { BlogItem } from 'src/blogs/entities/blog-item.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Cashback } from 'src/cashback/entities/cashback.entity';
import { Category } from 'src/category/entities/category.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Faq } from 'src/faqs/entities/faq.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Follower } from 'src/followers/entities/follower.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Review } from 'src/review/entities/review.entity';
import { Store } from 'src/store/entities/store.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { SubmitOffer } from 'src/submit-offer/entities/submit-offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import fs from 'fs-extra';

config();

const configService = new ConfigService();

const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    User,
    Coupon,
    Category,
    Seo,
    Store,
    SubCategory,
    Faq,
    Wishlist,
    Follower,
    Feedback,
    Review,
    Cashback,
    Purchase,
    AffiliateLink,
    SubmitOffer,
    Blog,
    BlogItem,
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  subscribers: [],
};

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions)],
})
export class DatabaseModule {}
