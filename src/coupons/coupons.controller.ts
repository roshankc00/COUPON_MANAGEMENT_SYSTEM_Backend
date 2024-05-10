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
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
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
}
