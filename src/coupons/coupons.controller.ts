import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('coupons')
@ApiTags('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @ApiOperation({
    summary: 'create  the  Coupon',
  })
  @ApiResponse({ status: 201, description: 'It will return the  Coupon' })
  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @ApiOperation({
    summary: 'get  the all Coupons',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the    Coupons',
  })
  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @ApiOperation({
    summary: 'Get the single Coupon',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Coupon' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update the Coupon',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Coupon' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @ApiOperation({
    summary: 'remove  the Coupon from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Coupon' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}
