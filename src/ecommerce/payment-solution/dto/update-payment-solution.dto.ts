import { PartialType } from '@nestjs/swagger';
import { CreatePaymentSolutionDto } from './create-payment-solution.dto';

export class UpdatePaymentSolutionDto extends PartialType(CreatePaymentSolutionDto) {}
