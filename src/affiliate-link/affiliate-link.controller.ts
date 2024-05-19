import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AffiliateLinkService } from './affiliate-link.service';
import { CreateAffiliateLinkDto } from './dto/create-affiliate-link.dto';
import { UpdateAffiliateLinkDto } from './dto/update-affiliate-link.dto';

@Controller('affiliate-link')
export class AffiliateLinkController {
  constructor(private readonly affiliateLinkService: AffiliateLinkService) {}

  @Get()
  findAll() {
    return this.affiliateLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateLinkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto,
  ) {
    return this.affiliateLinkService.update(+id, updateAffiliateLinkDto);
  }

  @Patch('increase/count/:id')
  updateCount(
    @Param('id') id: string,
    @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto,
  ) {
    return this.affiliateLinkService.updateClick(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliateLinkService.remove(+id);
  }
}
