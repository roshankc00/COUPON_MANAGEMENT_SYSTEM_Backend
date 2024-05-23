import { Module } from '@nestjs/common';
import { AffiliateLinkService } from './affiliate-link.service';
import { AffiliateLinkController } from './affiliate-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateLink } from './entities/affiliate-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliateLink])],
  controllers: [AffiliateLinkController],
  providers: [AffiliateLinkService],
  exports: [AffiliateLinkService],
})
export class AffiliateLinkModule {}
