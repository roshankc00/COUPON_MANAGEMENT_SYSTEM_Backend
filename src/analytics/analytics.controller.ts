import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({
    summary: 'Get the  user analytics ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  month and count ',
  })
  @Get('users')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  findUserAnalytics() {
    return this.analyticsService.getUserAnalytics();
  }
  @ApiOperation({
    summary: 'Get the  user  analytics ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  month and count ',
  })
  @Get('coupons')
  findStoreAnalytics() {
    return this.analyticsService.getCouponsAnalytics();
  }
  @ApiOperation({
    summary: 'Get the  store analytics ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  month and count ',
  })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Get('stores')
  findCouponsAnalytics() {
    return this.analyticsService.getStoreAnalytics();
  }

  @ApiOperation({
    summary: 'Get the  no of registered data ',
  })
  @ApiResponse({
    status: 200,
    description:
      'It will return the  no of user coupon category in the database ',
  })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Get('counts')
  getAllCounts() {
    return this.analyticsService.getAllCounts();
  }
}
