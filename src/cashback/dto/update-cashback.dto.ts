import { PartialType } from '@nestjs/swagger';
import { CreateCashbackDto } from './create-cashback.dto';

export class UpdateCashbackDto extends PartialType(CreateCashbackDto) {}
