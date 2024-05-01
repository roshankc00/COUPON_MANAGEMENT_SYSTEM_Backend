import { Get, Injectable, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserSignupDto } from './dto/user.signup.dto';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  signupUser(userSignupDto: UserSignupDto) {
    return this.userService.create(userSignupDto);
  }

  async login(user: User, response: Response) {
    const tokenPayload = {
      userId: user.id,
      role: user.role,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
