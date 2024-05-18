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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saveImageToStorage } from '../../src/common/file/file.upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from '../../src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from '../../src/auth/guards/role.guard';
import { SearchDto } from './dto/search.dto';
@Controller('store')
@ApiTags('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'create  the  store',
  })
  @ApiResponse({ status: 201, description: 'It will return the  store' })
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  create(
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storeService.create(createStoreDto, file);
  }

  @ApiOperation({
    summary: 'get  the all stores',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the    stores',
  })
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @ApiOperation({
    summary: 'Get the single store',
  })
  @ApiResponse({ status: 200, description: 'It will return the  store' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update the store',
  })
  @ApiResponse({ status: 200, description: 'It will return the  store' })
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storeService.update(+id, updateStoreDto, file);
  }

  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @ApiOperation({
    summary: 'remove  the store from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  store' })
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }

  @ApiOperation({
    summary: 'search  the store and category from database',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  store and category in an array',
  })
  @Get('store-cat/search')
  searchStoreAndCategory(@Query() query: SearchDto) {
    return this.storeService.search(query);
  }

  @ApiOperation({
    summary: 'Get the  latest  store',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return array of   store',
  })
  @Get('get-latest-stores')
  getLatesUser(@Query('no') no: string) {
    return this.storeService.getLateststore(+no);
  }
}
