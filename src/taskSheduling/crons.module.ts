import { Module } from '@nestjs/common';
import { PurchaseServiceShedule } from './purchaseTrack.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AffiliateLinkModule } from 'src/affiliate-link/affiliate-link.module';
import { PurchaseModule } from 'src/purchase/purchase.module';

@Module({
  imports: [ScheduleModule.forRoot(), AffiliateLinkModule, PurchaseModule],
  providers: [PurchaseServiceShedule],
})
export class CronsModule {}
