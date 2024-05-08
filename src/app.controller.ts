import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { saveImageToStorage } from './common/file/file.upload.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('try')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    return file.filename;
  }
}
