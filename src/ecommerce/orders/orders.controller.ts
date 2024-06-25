import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AcceptOrderDto } from './dto/order.accept.dto';
import { FindAllOrderDto } from './dto/find-all-order.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JWtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Currentuser() user: User) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  findAll(@Query() findAllOrderDto: FindAllOrderDto) {
    return this.ordersService.findAll(findAllOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Get('all/user/my')
  @UseGuards(JWtAuthGuard)
  getAllOrderOfUser(@Currentuser() user: User) {
    return this.ordersService.getAllOrdersOfUser(user);
  }

  @Patch('reject/:id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  rejectOrder(@Param('id') id: string) {
    return this.ordersService.rejectOrder(+id);
  }

  @Patch('pending/:id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  pendingOrder(@Param('id') id: string) {
    return this.ordersService.pendingOrder(+id);
  }

  @Get('/mine/orders')
  @UseGuards(JWtAuthGuard)
  getAllMyOrders(@Currentuser() user: User) {
    return this.ordersService.getAllMyOrder(user);
  }
}
