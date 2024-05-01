import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Category } from 'src/category/entities/category.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('TYPEORM_HOST'),
  port: configService.getOrThrow('TYPEORM_PORT'),
  username: configService.getOrThrow('TYPEORM_USERNAME'),
  database: configService.getOrThrow('TYPEORM_DATABASE'),
  password: configService.getOrThrow('TYPEORM_PASSWORD'),
  entities: [User, Category, Seo, Store],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};
const dataSource = new DataSource(datasourceOptions);

export default dataSource;
