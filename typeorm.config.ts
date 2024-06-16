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
import { Home } from 'src/home/entities/home.entity';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { License } from 'src/ecommerce/license/entities/license.entity';

config();

const configService = new ConfigService();

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: [
    AffiliateLink,
    Blog,
    BlogItem,
    Cashback,
    Category,
    Coupon,
    Faq,
    Feedback,
    Follower,
    Purchase,
    Review,
    Store,
    SubCategory,
    SubmitOffer,
    User,
    Wishlist,
    Seo,
    Home,
    Product,
    Order,
    License,
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  subscribers: [],
  ssl: {
    rejectUnauthorized: true, // Enable to verify certificates (recommended for prod)
  },
};
const dataSource = new DataSource(datasourceOptions);

export default dataSource;
