import { PartialType } from '@nestjs/swagger';
import { CreateSubmitOfferDto } from './create-submit-offer.dto';

export class UpdateSubmitOfferDto extends PartialType(CreateSubmitOfferDto) {}
