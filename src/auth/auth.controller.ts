import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user.signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Request, Response } from 'express';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { JWtAuthGuard } from './guards/jwt.auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { Observable, of } from 'rxjs';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiOperation({
    summary: 'Register the new User',
  })
  @ApiResponse({ status: 201, description: 'It will return the New User' })
  signupUser(@Body() userSignupDto: UserSignupDto, @Req() req: Request) {
    return this.authService.signupUser(userSignupDto, req);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'login  the  User',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the user details and store token in cookie',
  })
  async login(
    @Currentuser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Get('me')
  @ApiOperation({
    summary: 'get   the login   User',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the user details',
  })
  @UseGuards(JWtAuthGuard)
  async getUser(@Currentuser() user: User) {
    return user;
  }
}
