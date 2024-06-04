import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { GetProductDto } from './dto/get-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() getProductDto: GetProductDto) {
    return this.productsService.findAll(getProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
