import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAffiliateLinkDto } from './dto/create-affiliate-link.dto';
import { UpdateAffiliateLinkDto } from './dto/update-affiliate-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliateLink } from './entities/affiliate-link.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AffiliateLinkService {
  constructor(
    @InjectRepository(AffiliateLink)
    private readonly affiliateLinkRepository: Repository<AffiliateLink>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createAffiliateLinkDto: CreateAffiliateLinkDto) {
    const newLink = new AffiliateLink({
      ...createAffiliateLinkDto,
      clicks: 0,
    });
    return this.entityManager.save(newLink);
  }

  async updateClick(id: number) {
    const link = await this.affiliateLinkRepository.findOne({
      where: { id },
    });
    link.clicks += 1;
    return this.entityManager.save(link);
  }

  findAll() {
    return this.affiliateLinkRepository.find({ relations: { coupons: true } });
  }

  findOne(id: number) {
    return this.affiliateLinkRepository.findOne({
      where: { id },
      relations: { coupons: true },
    });
  }

  async update(id: number, updateAffiliateLinkDto: UpdateAffiliateLinkDto) {
    const linkExist = await this.affiliateLinkRepository.findOne({
      where: { id },
    });
    if (!linkExist) {
      throw new NotFoundException();
    }
    const updLink = Object.assign(linkExist, updateAffiliateLinkDto);
    return this.entityManager.save(updLink);
  }

  async remove(id: number) {
    const linkExist = await this.affiliateLinkRepository.findOne({
      where: { id },
    });
    if (!linkExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(linkExist);
  }
}
