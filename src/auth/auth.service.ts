import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserSignupDto } from './dto/user.signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  signupUser(userSignupDto: UserSignupDto) {
    return this.userService.create(userSignupDto);
  }
}
