import { Module } from '@nestjs/common';
import { PaymentSolutionService } from './payment-solution.service';
import { PaymentSolutionController } from './payment-solution.controller';

@Module({
  controllers: [PaymentSolutionController],
  providers: [PaymentSolutionService],
})
export class PaymentSolutionModule {}
