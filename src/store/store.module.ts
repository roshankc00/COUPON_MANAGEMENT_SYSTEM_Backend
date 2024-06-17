import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { GenerateAnalytics } from 'src/common/analytics/getAnalytics';
import { CategoryModule } from 'src/category/category.module';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    CategoryModule,
    AzureBulbStorageModule,
  ],
  controllers: [StoreController],
  providers: [StoreService, GenerateAnalytics],
  exports: [StoreService],
})
export class StoreModule {}
