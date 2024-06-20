import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AzureBulbStorageModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
