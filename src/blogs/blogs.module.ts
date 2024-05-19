import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogItem } from './entities/blog-item.entity';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogItem, Blog])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
