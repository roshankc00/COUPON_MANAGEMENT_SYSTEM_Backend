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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Currentuser } from 'src/common/decorators/current.user.decorator';
import { FindReviewDto } from './dto/find.review';
import { ReviewStatusDto } from './dto/review.status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'create  the user review',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  return the created created review of user',
  })
  @Post()
  @UseGuards(JWtAuthGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Currentuser() user: User) {
    return this.reviewService.create(createReviewDto, user);
  }

  @ApiOperation({
    summary: 'get all the reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return all  reviews',
  })
  @Get()
  findAll(@Query() query: FindReviewDto) {
    return this.reviewService.findAll(query);
  }

  @ApiOperation({
    summary: 'get the rating analytics ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the no of stars with their counts',
  })
  @Get('rating/number')
  getReviewNo(@Query() query: ReviewStatusDto) {
    return this.reviewService.findReviewCountByRating(query);
  }

  @ApiOperation({
    summary: 'get single review of  the user ',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the review of user',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update  the user review',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  the updated review of user',
  })
  @Patch(':id')
  @UseGuards(JWtAuthGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @ApiOperation({
    summary: 'delete  the user review',
  })
  @ApiResponse({
    status: 200,
    description: 'It will  return the delted review of user',
  })
  @Delete(':id')
  @UseGuards(JWtAuthGuard)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
