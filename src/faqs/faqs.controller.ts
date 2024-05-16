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
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.faqsService.remove(+id);
  }
}
