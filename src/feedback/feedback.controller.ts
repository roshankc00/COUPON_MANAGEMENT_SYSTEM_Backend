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
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({
    summary: 'create  the user feedback',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the  created feedback of user',
  })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @ApiOperation({
    summary: 'create  the user feedback',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  return the created created feedback of user',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @ApiOperation({
    summary: 'get all the feedback of  the users',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return all  the  feedbacks of user',
  })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Get()
  findall() {
    return this.feedbackService.findAll();
  }

  @ApiOperation({
    summary: 'update  the user feedback',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the updated feedback of user',
  })
  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @ApiOperation({
    summary: 'delete  the user feedback',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  return the deleted feedback of user',
  })
  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
