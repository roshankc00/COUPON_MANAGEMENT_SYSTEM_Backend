import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { Subscription } from '../subscription/entities/subscription.entity';
import { AcceptOrderDto } from './dto/order.accept.dto';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
    private readonly subscriptionService: SubscriptionService,
  ) {}
  create(createOrderDto: CreateOrderDto, user: User) {
    const { email, name, productId } = createOrderDto;
    const order = new Order({
      productId,
      email,
      name,
      user,
    });
    return this.entityManager.save(order);
  }

  findAll() {
    return this.orderRepository.find({});
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
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

  async acceptOrder(id: number, acceptOrderDto: AcceptOrderDto) {
    const { licenseId } = acceptOrderDto;
    const orderExist = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!orderExist) {
      throw new NotFoundException();
    }
    orderExist.status = ORDER_STATUS_ENUM.completed;
    await this.subscriptionService.create({
      licenseId,
      orderId: id,
      user: orderExist.user,
    });
    return this.entityManager.save(orderExist);
  }

  async getAllOrdersOfUser(user: User) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
}
