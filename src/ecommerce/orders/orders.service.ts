import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { AcceptOrderDto } from './dto/order.accept.dto';
import { LicenseService } from '../license/license.service';
import { FindAllOrderDto } from './dto/find-all-order.dto';
import { InsertTransectionIdDto } from './dto/insertTransectionId';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createOrderDto: CreateOrderDto, user: User) {
    const { subProductId, orderDetails } = createOrderDto;
    const order = new Order({
      subProductId,
      user,
      orderDetails,
    });
    return this.entityManager.save(order);
  }

  async findAll(query: FindAllOrderDto) {
    const { status } = query;
    if (status) {
      return this.orderRepository.find({
        where: { status },
        relations: {
          user: true,
          subProduct: {
            product: true,
          },
          license: true,
        },
      });
    } else {
      return this.orderRepository.find({
        relations: {
          user: true,
          subProduct: {
            product: true,
          },
          license: true,
        },
      });
    }
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        subProduct: {
          product: true,
        },
        license: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderExist = await this.orderRepository.findOne({ where: { id } });
    if (!orderExist) {
      throw new NotFoundException();
    }
    const updOrder = Object.assign(orderExist, updateOrderDto);
    return this.entityManager.save(updOrder);
  }

  async remove(id: number) {
    const orderExist = await this.orderRepository.findOne({ where: { id } });
    if (!orderExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(orderExist);
  }

  async getAllOrdersOfUser(user: User) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  async rejectOrder(id: number) {
    const orderExist = await this.orderRepository.findOne({ where: { id } });
    if (!orderExist) {
      throw new NotFoundException();
    }
    orderExist.status = ORDER_STATUS_ENUM.rejected;
    return this.entityManager.save(orderExist);
  }
  async pendingOrder(id: number) {
    const orderExist = await this.orderRepository.findOne({ where: { id } });
    if (!orderExist) {
      throw new NotFoundException();
    }
    orderExist.status = ORDER_STATUS_ENUM.pending;
    return this.entityManager.save(orderExist);
  }

  async getAllMyOrder(user: User) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.subProduct', 'subProduct')
      .leftJoinAndSelect('subProduct.product', 'product')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  async addTransectionId(insertTransectionIdDto: InsertTransectionIdDto) {
    const { orderId, transectionId } = insertTransectionIdDto;
    const orderExist = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    if (!orderExist) {
      throw new NotFoundException();
    }
    orderExist.transectionId = transectionId;

    return this.entityManager.save(orderExist);
  }
}
