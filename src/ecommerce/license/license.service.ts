import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrdersService } from '../orders/orders.service';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { EmailService } from 'src/common/email/email.service';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    private readonly entityManager: EntityManager,
    private readonly ordersService: OrdersService,
    private readonly emailService: EmailService,
  ) {}
  async create(createLicenseDto: CreateLicenseDto) {
    const { code, orderId, title } = createLicenseDto;
    const orderExist = await this.ordersService.findOne(orderId);
    const liscense = new License({
      name: orderExist.name,
      email: orderExist.email,
      code,
      title,
      user: orderExist.user,
    });
    orderExist.status = ORDER_STATUS_ENUM.completed;
    orderExist.isPaid = true;
    await this.entityManager.save(orderExist);
    await this.emailService.orderVerifiedMail({
      email: orderExist.email,
      subject: 'Order sucess',
      userName: orderExist.name,
      template: 'orderSuccess.ejs',
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
