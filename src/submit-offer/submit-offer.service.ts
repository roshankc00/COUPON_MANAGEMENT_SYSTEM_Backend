import { Injectable } from '@nestjs/common';
import { CreateSubmitOfferDto } from './dto/create-submit-offer.dto';
import { UpdateSubmitOfferDto } from './dto/update-submit-offer.dto';

@Injectable()
export class SubmitOfferService {
  create(createSubmitOfferDto: CreateSubmitOfferDto) {
    return 'This action adds a new submitOffer';
  }

  findAll() {
    return `This action returns all submitOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submitOffer`;
  }

  update(id: number, updateSubmitOfferDto: UpdateSubmitOfferDto) {
    return `This action updates a #${id} submitOffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitOffer`;
  }
}
