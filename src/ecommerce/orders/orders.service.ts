import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createOrderDto: CreateOrderDto, user: User) {
    const { email, name, productId } = createOrderDto;
    const order = new Order({
      productId,
      email,
      name,
      user,
    });
    return 'This action adds a new order';
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
}
