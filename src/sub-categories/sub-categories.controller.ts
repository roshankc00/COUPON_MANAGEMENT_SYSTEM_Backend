import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('sub-categories')
@ApiTags('Sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @ApiOperation({
    summary: 'create  the  Sub-Category',
  })
  @ApiResponse({ status: 201, description: 'It will return the  Sub-Category' })
  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @ApiOperation({
    summary: 'get  the all Sub-Categories',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the    Sub-Categories',
  })
  @Get()
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @ApiOperation({
    summary: 'Get the single Sub-Category',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Sub-Category' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoriesService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update the Sub-Category',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Sub-Category' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(+id, updateSubCategoryDto);
  }
  @ApiOperation({
    summary: 'remove  the Sub-Category from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Sub-Category' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoriesService.remove(+id);
  }
}
