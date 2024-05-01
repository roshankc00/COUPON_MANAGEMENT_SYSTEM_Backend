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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user.signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { JWtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signupUser(@Body() userSignupDto: UserSignupDto) {
    return this.authService.signupUser(userSignupDto);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Currentuser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.status(200).json({
      user: user,
    });
  }

  @Get('me')
  @UseGuards(JWtAuthGuard)
  async getUser(@Currentuser() user: User) {
    return user;
  }
}
