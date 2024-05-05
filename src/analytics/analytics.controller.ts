import { Controller, Get, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
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
  @Get('counts')
  getAllCounts() {
    return this.analyticsService.getAllCounts();
  }
}
