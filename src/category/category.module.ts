import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Seo } from 'src/common/entity/Seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Seo])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
