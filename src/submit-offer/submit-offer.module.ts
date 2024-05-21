import { Module } from '@nestjs/common';
import { SubmitOfferService } from './submit-offer.service';
import { SubmitOfferController } from './submit-offer.controller';

@Module({
  controllers: [SubmitOfferController],
  providers: [SubmitOfferService],
})
export class SubmitOfferModule {}
