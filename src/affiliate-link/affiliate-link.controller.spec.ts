import { Test, TestingModule } from '@nestjs/testing';
import { AffiliateLinkController } from './affiliate-link.controller';
import { AffiliateLinkService } from './affiliate-link.service';

describe('AffiliateLinkController', () => {
  let controller: AffiliateLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffiliateLinkController],
      providers: [AffiliateLinkService],
    }).compile();

    controller = module.get<AffiliateLinkController>(AffiliateLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
