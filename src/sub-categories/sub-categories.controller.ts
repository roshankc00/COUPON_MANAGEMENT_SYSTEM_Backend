import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from '../../src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from '../../src/auth/guards/role.guard';
import { FindAllSubCategoryQueryDto } from './dto/findAll.sub-categories.dto';
@Controller('sub-categories')
@ApiTags('Sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @ApiOperation({
    summary: 'create  the  Sub-Category',
  })
  @ApiResponse({ status: 201, description: 'It will return the  Sub-Category' })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
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
  findAll(@Query() query: FindAllSubCategoryQueryDto) {
    return this.subCategoriesService.findAll(query);
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
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
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
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoriesService.remove(+id);
  }
}
