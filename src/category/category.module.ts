import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AzureBulbStorageModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
