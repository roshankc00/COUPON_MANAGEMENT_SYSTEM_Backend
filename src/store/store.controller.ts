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
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saveImageToStorage } from 'src/common/file/file.upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('store')
@ApiTags('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'remove  the store from database',
  })
  @ApiResponse({ status: 200, description: 'It will return the  store' })
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
