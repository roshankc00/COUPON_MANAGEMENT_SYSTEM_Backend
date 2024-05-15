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
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post('follow-unfollow')
  @UseGuards(JWtAuthGuard)
  followUnfollow(
    @Body() createFollowerDto: CreateFollowerDto,
    @Currentuser() user: User,
  ) {
    return this.followersService.followUnfollow(createFollowerDto, user);
  }

  @Patch('remove-followerList')
  @UseGuards(JWtAuthGuard)
  remove(@Currentuser() user: User) {
    return this.followersService.remove(user);
  }
  @Get('my')
  @UseGuards(JWtAuthGuard)
  getAllStoreOfUser(@Currentuser() user: User) {
    return this.followersService.getAllStoreOfUser(user);
  }
}
