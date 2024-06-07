import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { ForgetPasswordDto } from './dto/forget.password.dto';
import { Request } from 'express';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RequestVerifyEmailDto } from './dto/request-verifyemail.dto';
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
    summary: 'make  the user active  false',
  })
  @ApiResponse({ status: 200, description: 'It will return all the  User' })
  @Delete(':id')
  @UseGuards(JwtRoleAuthGuard)
  @Roles(USER_ROLE_ENUM.USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({
    summary: 'send the forget Password link to the usermail',
  })
  @ApiResponse({ status: 200, description: 'will sendd the link to the mail' })
  @Post('forget-password')
  forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
    @Req() req: Request,
  ) {
    return this.usersService.forgetPassword(forgetPasswordDto, req);
  }

  @ApiOperation({
    summary: 'reset  the forget Password',
  })
  @ApiResponse({ status: 200, description: 'will change forget  password' })
  @Post('reset-password/:token')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Req() req: Request,
  ) {
    return this.usersService.resetPassword(resetPasswordDto, req);
  }

  @ApiOperation({
    summary: 'reset  the login user Password',
  })
  @ApiResponse({
    status: 200,
    description: 'will change password of the login user',
  })
  @Post('change-password')
  @UseGuards(JWtAuthGuard)
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(changePasswordDto);
  }

  @ApiOperation({
    summary: 'will verify the user immediatly after registration',
  })
  @ApiResponse({
    status: 200,
    description:
      'will verify the user immediatly after registration by the link send in the inbox ',
  })
  @Get('verify-email/:token')
  verifyEmail(@Req() req: Request) {
    return this.usersService.verifyEmail(req);
  }

  @ApiOperation({
    summary: 'Get the 10 latest  User',
  })
  @ApiResponse({ status: 200, description: 'It will return array of 10  User' })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Get('get-latest-users')
  getLatesUser(@Query('no') no: string) {
    return this.usersService.getLatestUser(+no);
  }

  @Post('verify/email')
  requestverifyEmail(@Body() requestVerifyEmailDto: RequestVerifyEmailDto) {
    return this.usersService.requestForEmailVerfication(requestVerifyEmailDto);
  }
}
