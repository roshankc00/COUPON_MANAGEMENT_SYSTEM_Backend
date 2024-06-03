import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAffiliateLinkDto } from './dto/create-affiliate-link.dto';
import { UpdateAffiliateLinkDto } from './dto/update-affiliate-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliateLink } from './entities/affiliate-link.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
const crypto = require('crypto');
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AffiliateLinkService {
  constructor(
    @InjectRepository(AffiliateLink)
    private readonly affiliateLinkRepository: Repository<AffiliateLink>,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}
  async create(createAffiliateLinkDto: CreateAffiliateLinkDto) {
    const {
      apiKey,
      apiLink,
      link,
      merchant,
      cashbackAmountPer,
      tagLine,
      storeId,
    } = createAffiliateLinkDto;
    let newLink;
    if (apiKey && apiLink) {
      newLink = new AffiliateLink({
        ...createAffiliateLinkDto,
        apiKey: this.encrypt(createAffiliateLinkDto.apiKey),
        clicks: 0,
      });
    } else {
      newLink = new AffiliateLink({
        link,
        merchant,
        cashbackAmountPer,
        tagLine,
        storeId,
        clicks: 0,
      });
    }
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
    return this.affiliateLinkRepository.find({ relations: { store: true } });
  }

  findOne(id: number) {
    return this.affiliateLinkRepository.findOne({
      where: { id },
      relations: { store: true },
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

  encrypt(text: string): string {
    return jwt.sign({ data: text }, this.configService.get('ENCRIPT_KEY'), {
      expiresIn: null,
    });
  }

  decrypt(token: string): string {
    try {
      const payload = jwt.verify(
        token,
        this.configService.get('ENCRIPT_KEY'),
      ) as { data: string };
      return payload.data;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
