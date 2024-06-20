import { Module } from '@nestjs/common';
import { SubProductService } from './sub-product.service';
import { SubProductController } from './sub-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProduct } from './entities/sub-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubProduct])],
  controllers: [SubProductController],
  providers: [SubProductService],
})
export class SubProductModule {}
