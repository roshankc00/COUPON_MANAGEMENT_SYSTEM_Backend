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
import { Order } from '../orders/entities/order.entity';

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

  findAll(): Promise<License[]> {
    return this.licenseRepository.find({
      relations: ['subProduct', 'subProduct.product', 'user'],
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<License> {
    return this.licenseRepository.findOne({
      where: { id },
      relations: ['subProduct', 'subProduct.product', 'user'],
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

    return await this.entityManager.transaction(async (manager) => {
      try {
        const license = await manager.findOne(License, {
          where: { id: licenseId },
          relations: ['subProduct'],
        });

        if (!license) {
          throw new BadRequestException('License not found');
        }

        const order = await this.ordersService.findOne(orderId);

        if (!order) {
          throw new BadRequestException('Order not found');
        }

        if (!order?.subProduct || !license?.subProduct) {
          throw new BadRequestException('SubProduct information is missing');
        }

        if (order.subProduct.id !== license.subProduct.id) {
          throw new BadRequestException('SubProduct mismatch');
        }

        license.user = order.user;
        license.assigned = true;

        const updatedLicense = await manager.save(License, license);

        order.status = ORDER_STATUS_ENUM.completed;
        order.isPaid = true;
        order.license = updatedLicense;

        const updatedOrder = await manager.save(Order, order);

        return { updatedLicense, updatedOrder };
      } catch (error) {
        console.error('Error in acceptOrder:', error);
        throw new BadRequestException('Error processing order');
      }
    });
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
