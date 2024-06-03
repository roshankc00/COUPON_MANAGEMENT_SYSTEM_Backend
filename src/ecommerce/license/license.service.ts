import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createLicenseDto: CreateLicenseDto) {
    const { code, productId } = createLicenseDto;
    const liscense = new License({
      productId,
      code,
    });
    return this.entityManager.save(liscense);
  }

  findAll() {
    return this.licenseRepository.find({});
  }

  findOne(id: number) {
    return this.licenseRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLicenseDto: UpdateLicenseDto) {
    const licenseExist = await this.licenseRepository.findOne({
      where: { id },
    });
    if (!licenseExist) {
      throw new NotFoundException();
    }
    const updLicense = Object.assign(licenseExist, updateLicenseDto);
    return this.entityManager.save(updLicense);
  }

  async remove(id: number) {
    const licenseExist = await this.licenseRepository.findOne({
      where: { id },
    });
    if (!licenseExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(licenseExist);
  }
}
