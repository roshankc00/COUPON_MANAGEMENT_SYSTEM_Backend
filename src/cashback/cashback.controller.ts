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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cashback')
@Controller('cashback')
export class CashbackController {
  constructor(private readonly cashbackService: CashbackService) {}
  @ApiOperation({
    summary: 'get  the all cashbacks',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the   cashbacks',
  })
  @Get()
  findAll() {
    return this.cashbackService.findAll();
  }

  @ApiOperation({
    summary: 'get  the single cashbacks',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the single cashbacks',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashbackService.findOne(+id);
  }

  @ApiOperation({
    summary: 'get  the users  cashbacks',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return all the cashback of user',
  })
  @Get('user/mine')
  @UseGuards(JWtAuthGuard)
  getALlUserPurchases(@Currentuser() user: User) {
    return this.cashbackService.getAllCashbacksOfUser(user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update   the   cashback of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return all the upated cashback ',
  })
  update(
    @Param('id') id: string,
    @Body() updateCashbackDto: UpdateCashbackDto,
  ) {
    return this.cashbackService.update(+id, updateCashbackDto);
  }

  @ApiOperation({
    summary: 'disable  the   cashback of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return disabled  cashback ',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashbackService.remove(+id);
  }
}
