import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';
import { HomeItem } from './entities/homepage.item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, HomeItem]), AzureBulbStorageModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
