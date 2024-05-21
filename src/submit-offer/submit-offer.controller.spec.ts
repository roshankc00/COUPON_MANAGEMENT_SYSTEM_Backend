import { Test, TestingModule } from '@nestjs/testing';
import { SubmitOfferController } from './submit-offer.controller';
import { SubmitOfferService } from './submit-offer.service';

describe('SubmitOfferController', () => {
  let controller: SubmitOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitOfferController],
      providers: [SubmitOfferService],
    }).compile();

    controller = module.get<SubmitOfferController>(SubmitOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
