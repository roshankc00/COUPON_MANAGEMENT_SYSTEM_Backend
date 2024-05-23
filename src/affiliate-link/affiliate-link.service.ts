import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAffiliateLinkDto } from './dto/create-affiliate-link.dto';
import { UpdateAffiliateLinkDto } from './dto/update-affiliate-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AffiliateLink } from './entities/affiliate-link.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AffiliateLinkService {
  constructor(
    @InjectRepository(AffiliateLink)
    private readonly affiliateLinkRepository: Repository<AffiliateLink>,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}
  async create(createAffiliateLinkDto: CreateAffiliateLinkDto) {
    const newLink = new AffiliateLink({
      ...createAffiliateLinkDto,
      apiKey: this.encrypt(createAffiliateLinkDto.apiKey),
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
    return this.affiliateLinkRepository.find({});
  }

  findOne(id: number) {
    return this.affiliateLinkRepository.findOne({
      where: { id },
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

  private encrypt(text: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.configService.get('ENCRIPT_KEY')),
      iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(text: string) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this.configService.get('ENCRIPT_KEY')),
      iv,
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
