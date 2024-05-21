import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmitOfferService } from './submit-offer.service';
import { CreateSubmitOfferDto } from './dto/create-submit-offer.dto';
import { UpdateSubmitOfferDto } from './dto/update-submit-offer.dto';

@Controller('submit-offer')
export class SubmitOfferController {
  constructor(private readonly submitOfferService: SubmitOfferService) {}

  @Post()
  create(@Body() createSubmitOfferDto: CreateSubmitOfferDto) {
    return this.submitOfferService.create(createSubmitOfferDto);
  }

  @Get()
  findAll() {
    return this.submitOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitOfferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmitOfferDto: UpdateSubmitOfferDto) {
    return this.submitOfferService.update(+id, updateSubmitOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitOfferService.remove(+id);
  }
}
