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
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Followers')
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @ApiOperation({
    summary: 'Follow the store if store  already exists then  unfollow  it ',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the  followed or unfollowed store details ',
  })
  @Post('follow-unfollow')
  @UseGuards(JWtAuthGuard)
  followUnfollow(
    @Body() createFollowerDto: CreateFollowerDto,
    @Currentuser() user: User,
  ) {
    return this.followersService.followUnfollow(createFollowerDto, user);
  }

  @ApiOperation({
    summary: 'unfollow   all the store  ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  followed or unfollowed store details ',
  })
  @Patch('remove-followerList')
  @UseGuards(JWtAuthGuard)
  remove(@Currentuser() user: User) {
    return this.followersService.remove(user);
  }

  @ApiOperation({
    summary: 'get    all the followed  store of the user ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  followed or unfollowed store details ',
  })
  @Get('my')
  @UseGuards(JWtAuthGuard)
  getAllStoreOfUser(@Currentuser() user: User) {
    return this.followersService.getAllStoreOfUser(user);
  }

  @UseGuards(JWtAuthGuard)
  @Get('store/exist')
  storeExistinFollowerList(
    @Query('storeId') storeId: string,
    @Currentuser() user: User,
  ) {
    return this.followersService.storeExistinFollowerList(+storeId, user);
  }
}
