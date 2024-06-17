import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmitOfferDto } from './dto/create-submit-offer.dto';
import { UpdateSubmitOfferDto } from './dto/update-submit-offer.dto';
import { SubmitOffer } from './entities/submit-offer.entity';
import { EntityManager, Repository, W } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AzureBulbStorageService } from 'src/common/blubstorage/blubstorage.service';

@Injectable()
export class SubmitOfferService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(SubmitOffer)
    private readonly offerRepository: Repository<SubmitOffer>,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(
    createSubmitOfferDto: CreateSubmitOfferDto,
    user: User,
    file: Express.Multer.File,
  ) {
    const { code, expireDate, isDeal, startDate, status, tagLine, url } =
      createSubmitOfferDto;

    if (file) {
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      const offer = new SubmitOffer({
        code: isDeal ? null : code,
        url,
        tagLine,
        startDate,
        expireDate,
        status,
        isDeal,
        bulbName: uploadedfile.blobName,
        imageUrl: uploadedfile.imageUrl,
        user,
      });
      return this.entityManager.save(offer);
    } else {
      const offer = new SubmitOffer({
        code: isDeal ? null : code,
        url,
        tagLine,
        startDate,
        expireDate,
        status,
        isDeal,
        user,
      });
      return this.entityManager.save(offer);
    }
  }

  findAll() {
    return this.offerRepository.find({});
  }

  findOne(id: number) {
    return this.offerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSubmitOfferDto: UpdateSubmitOfferDto) {
    const offer = await this.offerRepository.findOne({ where: { id } });
    if (!offer) {
      throw new NotFoundException();
    }
    const updOffer = Object.assign(offer, updateSubmitOfferDto);
    return this.entityManager.save(updOffer);
  }

  async remove(id: number) {
    const offer = await this.offerRepository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });
    await this.azureBulbStorageService.deleteImage(offer.bulbName);
    if (!offer) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(offer);
  }
}
