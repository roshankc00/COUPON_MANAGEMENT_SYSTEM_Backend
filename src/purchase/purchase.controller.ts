import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JWtAuthGuard)
  create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Currentuser() user: User,
  ) {
    return this.purchaseService.create(createPurchaseDto, user);
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Get('user/mine')
  @UseGuards(JWtAuthGuard)
  getAllUserPurchases(@Currentuser() user: User) {
    return this.purchaseService.getAllPurchaseOfUser(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
