import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from '../../src/common/file/file.upload.service';
import { Roles } from '../../src/common/decorators/role.decorator';
import { JwtRoleAuthGuard } from '../../src/auth/guards/role.guard';
import { USER_ROLE_ENUM } from '../../src/common/enums/user.role.enum';
import { FindAllQueryDto } from './dto/findCoupon.dto';
import { Currentuser } from '../common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';
@Controller('coupons')
@ApiTags('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @ApiOperation({
    summary: 'create  the  Coupon',
  })
  @ApiResponse({ status: 201, description: 'It will return the  Coupon' })
  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  create(
    @Body() createCouponDto: CreateCouponDto,
    @Currentuser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.couponsService.create(createCouponDto, file);
  }

  @ApiOperation({
    summary: 'get  the all Coupons',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the    Coupons',
  })
  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    return this.couponsService.findAll(query);
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
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.couponsService.update(+id, updateCouponDto, file);
  }

  @ApiOperation({
    summary: 'remove  the Coupon from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Coupon' })
  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }

  @ApiOperation({
    summary: 'Get the  latest  coupons',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return array of   coupons',
  })
  @Get('get-latest-coupons')
  getLatesUser(@Query('no') no: string) {
    return this.couponsService.getLatestCoupons(+no);
  }
}
