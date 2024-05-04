import { Controller, Get, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('users')
  findUserAnalytics() {
    return this.analyticsService.getCouponsAnalytics();
  }

  @Get('coupons')
  findStoreAnalytics() {
    return this.analyticsService.getUserAnalytics();
  }
  @Get('coupons')
  findCouponsAnalytics() {
    return this.analyticsService.getStoreAnalytics();
  }

  @Get('count')
  getAllCounts() {
    return this.analyticsService.getAllCounts();
  }
}
