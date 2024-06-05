import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentSolutionService } from './payment-solution.service';
import { CreatePaymentSolutionDto } from './dto/create-payment-solution.dto';
import { UpdatePaymentSolutionDto } from './dto/update-payment-solution.dto';

@Controller('payment-solution')
export class PaymentSolutionController {
  constructor(
    private readonly paymentSolutionService: PaymentSolutionService,
  ) {}

  @Post()
  create(@Body() createPaymentSolutionDto: CreatePaymentSolutionDto) {
    return this.paymentSolutionService.create(createPaymentSolutionDto);
  }
}
