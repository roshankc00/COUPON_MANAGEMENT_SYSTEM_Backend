import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/common/file/file.upload.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, saveImageToStorage))
  createSliderImage(@UploadedFiles() files: Express.Multer.File[]) {
    return this.homeService.create(files);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Delete('/image/:name')
  removeSliderImage(@Param('name') name: string) {
    return this.removeSliderImage(name);
  }

  @Delete('remove/home-data')
  remove() {
    return this.homeService.removeHomeData();
  }
}
