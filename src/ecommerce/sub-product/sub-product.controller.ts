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
import { SubProductService } from './sub-product.service';
import { CreateSubProductDto } from './dto/create-sub-product.dto';
import { UpdateSubProductDto } from './dto/update-sub-product.dto';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';

@Controller('sub-product')
export class SubProductController {
  constructor(private readonly subProductService: SubProductService) {}

  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  create(@Body() createSubProductDto: CreateSubProductDto) {
    return this.subProductService.create(createSubProductDto);
  }

  @Get()
  findAll() {
    return this.subProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subProductService.findOne(+id);
  }

  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSubProductDto: UpdateSubProductDto,
  ) {
    return this.subProductService.update(+id, updateSubProductDto);
  }

  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.subProductService.remove(+id);
  }
}
