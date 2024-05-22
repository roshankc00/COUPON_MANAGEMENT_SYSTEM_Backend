import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID:
        '1031986560741-r3ahe4djp54imqku609csb8t2a0iplf0.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/api/v1/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails } = profile;
    const user = {
      id,
      email: emails[0].value,
      name: displayName,
    };

    const existingUser = await this.usersService.validateUserGoogle(
      user.email,
      user.name,
    );

    if (existingUser) {
      return done(null, existingUser);
    }
    return done(null, user);
  }
}
