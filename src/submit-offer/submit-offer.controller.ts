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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';

@ApiTags('submit-offer')
@Controller('submit-offer')
export class SubmitOfferController {
  constructor(private readonly submitOfferService: SubmitOfferService) {}

  @ApiOperation({
    summary: 'create offer',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the created offer',
  })
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

  @ApiOperation({
    summary: 'get  the all offer',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the   offer',
  })
  @Get()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  findAll() {
    return this.submitOfferService.findAll();
  }

  @ApiOperation({
    summary: 'get  the single offer',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return   the   offer',
  })
  @Get(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  findOne(@Param('id') id: string) {
    return this.submitOfferService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update  the  offer',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  updated  offer',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmitOfferDto: UpdateSubmitOfferDto,
  ) {
    return this.submitOfferService.update(+id, updateSubmitOfferDto);
  }

  @ApiOperation({
    summary: 'delete the user offer',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the deleted   offer',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitOfferService.remove(+id);
  }
}
