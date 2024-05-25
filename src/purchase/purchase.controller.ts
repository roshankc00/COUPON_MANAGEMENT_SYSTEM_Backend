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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiOperation({
    summary: 'find all  purchases',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return   all the   purchases ',
  })
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @ApiOperation({
    summary: 'find  the user purchase',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return   single  purchase of user',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @ApiOperation({
    summary: 'create  the user purchase',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return   all the   purchase of user',
  })
  @Get('user/mine')
  @UseGuards(JWtAuthGuard)
  getAllUserPurchases(@Currentuser() user: User) {
    return this.purchaseService.getAllPurchaseOfUser(user);
  }

  @ApiOperation({
    summary: 'update  the user purchase',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return   the updated  purchase of user',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @ApiOperation({
    summary: 'delete   the user purchase',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return delted  purchase of user',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
