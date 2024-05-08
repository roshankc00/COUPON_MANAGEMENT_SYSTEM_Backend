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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get the single User',
  })
  @ApiResponse({ status: 200, description: 'It will return the  User' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiOperation({
    summary: 'Get the all User',
  })
  @ApiResponse({ status: 200, description: 'It will return all the  User' })
  @Get()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  find() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'make  the user status false',
  })
  @ApiResponse({ status: 200, description: 'It will return all the  User' })
  @Get()
  @Delete(':id')
  @UseGuards(JwtRoleAuthGuard)
  @Roles(USER_ROLE_ENUM.USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
