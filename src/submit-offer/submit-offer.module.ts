import { Module } from '@nestjs/common';
import { SubmitOfferService } from './submit-offer.service';
import { SubmitOfferController } from './submit-offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitOffer } from './entities/submit-offer.entity';
import { AzureBulbStorageModule } from 'src/common/blubstorage/bulb.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitOffer]), AzureBulbStorageModule],
  controllers: [SubmitOfferController],
  providers: [SubmitOfferService],
})
export class SubmitOfferModule {}
