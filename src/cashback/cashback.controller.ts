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
import { CashbackService } from './cashback.service';
import { CreateCashbackDto } from './dto/create-cashback.dto';
import { UpdateCashbackDto } from './dto/update-cashback.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('cashback')
export class CashbackController {
  constructor(private readonly cashbackService: CashbackService) {}

  @Post()
  @UseGuards(JWtAuthGuard)
  create(
    @Body() createCashbackDto: CreateCashbackDto,
    @Currentuser() user: User,
  ) {
    return this.cashbackService.create(createCashbackDto, user);
  }

  @Get()
  findAll() {
    return this.cashbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashbackService.findOne(+id);
  }

  @Get('user/mine')
  @UseGuards(JWtAuthGuard)
  getALlUserPurchases(@Currentuser() user: User) {
    return this.cashbackService.getAllCashbacksOfUser(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashbackDto: UpdateCashbackDto,
  ) {
    return this.cashbackService.update(+id, updateCashbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashbackService.remove(+id);
  }
}
