import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Category } from 'src/category/entities/category.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Faq } from 'src/faqs/entities/faq.entity';
import { Follower } from 'src/followers/entities/follower.entity';
import { Store } from 'src/store/entities/store.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

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
    User,
    Coupon,
    Category,
    Seo,
    Store,
    SubCategory,
    Faq,
    Wishlist,
    Follower,
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  subscribers: [],
};
const dataSource = new DataSource(datasourceOptions);

export default dataSource;
