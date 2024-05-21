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
} from '@nestjs/common';
import { SubmitOfferService } from './submit-offer.service';
import { CreateSubmitOfferDto } from './dto/create-submit-offer.dto';
import { UpdateSubmitOfferDto } from './dto/update-submit-offer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/common/file/file.upload.service';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('submit-offer')
export class SubmitOfferController {
  constructor(private readonly submitOfferService: SubmitOfferService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  @UseGuards(JWtAuthGuard)
  create(
    @Body() createSubmitOfferDto: CreateSubmitOfferDto,
    @UploadedFile() file: Express.Multer.File,
    @Currentuser() user: User,
  ) {
    return this.submitOfferService.create(createSubmitOfferDto, user, file);
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
  update(
    @Param('id') id: string,
    @Body() updateSubmitOfferDto: UpdateSubmitOfferDto,
  ) {
    return this.submitOfferService.update(+id, updateSubmitOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitOfferService.remove(+id);
  }
}
