import { Module } from '@nestjs/common';
import { CashbackService } from './cashback.service';
import { CashbackController } from './cashback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashback } from './entities/cashback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cashback])],
  controllers: [CashbackController],
  providers: [CashbackService],
})
export class CashbackModule {}
