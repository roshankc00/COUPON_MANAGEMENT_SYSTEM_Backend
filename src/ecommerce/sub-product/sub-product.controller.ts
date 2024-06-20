import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubProductService } from './sub-product.service';
import { CreateSubProductDto } from './dto/create-sub-product.dto';
import { UpdateSubProductDto } from './dto/update-sub-product.dto';

@Controller('sub-product')
export class SubProductController {
  constructor(private readonly subProductService: SubProductService) {}

  @Post()
  create(@Body() createSubProductDto: CreateSubProductDto) {
    return this.subProductService.create(createSubProductDto);
  }

  @Get()
  findAll() {
    return this.subProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubProductDto: UpdateSubProductDto) {
    return this.subProductService.update(+id, updateSubProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subProductService.remove(+id);
  }
}
