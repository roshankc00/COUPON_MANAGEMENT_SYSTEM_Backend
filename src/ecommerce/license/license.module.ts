import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([License]), OrdersModule],
  controllers: [LicenseController],
  providers: [LicenseService],
  exports: [LicenseService],
})
export class LicenseModule {}
