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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saveImageToStorage } from '../../src/common/file/file.upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRoleAuthGuard } from '../../src/auth/guards/role.guard';
import { Roles } from '../../src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from '../../src/common/enums/user.role.enum';
@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @ApiOperation({
    summary: 'create  the  Category',
  })
  @ApiResponse({ status: 201, description: 'It will return the  Category' })
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.create(createCategoryDto, file);
  }

  @Get()
  @ApiOperation({
    summary: 'get  the all Categories',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the    Categories',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the single Category',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Category' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  @ApiOperation({
    summary: 'update the Category',
  })
  @ApiResponse({ status: 200, description: 'It will return the  Category' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.update(+id, updateCategoryDto, file);
  }

  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @ApiOperation({
    summary: 'remove  the category from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  category' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @ApiOperation({
    summary: 'Get the  latest  categories',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return array of categories',
  })
  @Get('featured/get-latest-categories')
  getLatesUser(@Query('no') no: string) {
    return this.categoryService.getLatestcategory(+no);
  }
}
