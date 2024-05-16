import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Roles } from '../../src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from '../../src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from '../../src/auth/guards/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('faqs')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}
  @ApiOperation({
    summary: 'Create the Faq',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the created  faq details',
  })
  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }
  @ApiOperation({
    summary: 'Get all  the Faq',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the all  faqs details',
  })
  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single Faq',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the a  faqs ',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update  the Faq',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the updated faq details',
  })
  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(+id, updateFaqDto);
  }

  @ApiOperation({
    summary: 'delete  the Faq',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the deleted faq details',
  })
  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.faqsService.remove(+id);
  }
}
