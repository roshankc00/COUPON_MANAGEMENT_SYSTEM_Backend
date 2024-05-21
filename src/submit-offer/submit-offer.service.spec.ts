import { Test, TestingModule } from '@nestjs/testing';
import { SubmitOfferService } from './submit-offer.service';

describe('SubmitOfferService', () => {
  let service: SubmitOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitOfferService],
    }).compile();

    service = module.get<SubmitOfferService>(SubmitOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
