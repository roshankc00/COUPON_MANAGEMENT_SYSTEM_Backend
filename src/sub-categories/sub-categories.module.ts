import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { CategoryModule } from 'src/category/category.module';
import { GenerateAnalytics } from 'src/common/analytics/getAnalytics';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory]), CategoryModule],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, GenerateAnalytics],
})
export class SubCategoriesModule {}
