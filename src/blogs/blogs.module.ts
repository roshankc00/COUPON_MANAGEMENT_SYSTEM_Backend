import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AzureBulbStorageModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
