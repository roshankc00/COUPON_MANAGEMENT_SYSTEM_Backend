import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user.signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signupUser(@Body() userSignupDto: UserSignupDto) {
    return this.authService.signupUser(userSignupDto);
  }
}
