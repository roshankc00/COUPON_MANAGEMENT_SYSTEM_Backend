import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrdersService } from '../orders/orders.service';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { EmailService } from 'src/common/email/email.service';
import { AcceptOrderDto } from './dto/accept-order.dto';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    private readonly entityManager: EntityManager,
    private readonly ordersService: OrdersService,
  ) {}
  async create(createLicenseDto: CreateLicenseDto) {
    const { code, expireDate, subProductId, validityDays, title } =
      createLicenseDto;

    const newLicense = new License({
      code,
      subProductId,
      expireDate: expireDate ? expireDate : null,
      validityDays: validityDays ? validityDays : null,
      title,
    });
    return this.entityManager.save(newLicense);
  }

  findAll() {
    return this.licenseRepository.find({
      relations: {
        subProduct: true,
      },
    });
  }

  findOne(id: number) {
    return this.licenseRepository.findOne({
      where: { id },
      relations: {
        subProduct: true,
      },
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

  async acceptOrder(acceptOrderDto: AcceptOrderDto) {
    const { licenseId, orderId } = acceptOrderDto;
    const license = await this.licenseRepository.findOne({
      where: { id: licenseId },
      relations: {
        subProduct: true,
      },
    });
    const order = await this.ordersService.findOne(orderId);

    if (order.subProduct.id !== license.subProduct.id) {
      throw new BadRequestException();
    }
    license.user = order.user;
    license.assigned = true;
    const updlicense = await this.entityManager.save(license);
    order.status = ORDER_STATUS_ENUM.completed;
    order.isPaid = true;
    order.license = updlicense;
    await this.entityManager.save(order);
    return updlicense;
  }

  async getAllMyLicences(user: User) {
    return this.licenseRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.user', 'user')
      .leftJoinAndSelect('license.subProduct', 'subProduct')
      .leftJoinAndSelect('subProduct.product', 'product')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  getAllTheNotAssignesLicenses() {
    return this.licenseRepository.find({
      where: {
        assigned: false,
      },
      relations: {
        subProduct: true,
      },
    });
  }
}
