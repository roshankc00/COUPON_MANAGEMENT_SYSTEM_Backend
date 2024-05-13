import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { EntityManager, Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq) private readonly faqsRepository: Repository<Faq>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createFaqDto: CreateFaqDto) {
    const faq = new Faq({
      ...createFaqDto,
    });
    return this.entityManager.save(faq);
  }

  findAll() {
    return this.faqsRepository.find();
  }

  findOne(id: number) {
    return this.faqsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqsRepository.findOne({ where: { id } });
    const newFaq = Object.assign(faq, updateFaqDto);
    return this.entityManager.save(newFaq);
  }

  async remove(id: number) {
    const faq = await this.faqsRepository.findOne({ where: { id } });
    return this.entityManager.remove(faq);
  }
}
