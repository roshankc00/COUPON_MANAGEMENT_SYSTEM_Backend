import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  entities: [User],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};
const dataSource = new DataSource(datasourceOptions);

export default dataSource;
