import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from '../../src/common/file/file.upload.service';
import { BlogsService } from './blogs.service';
import { FindAllBlogsQueryDto } from './dto/find-blog.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @ApiOperation({
    summary: 'create   the all Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return  newly created   blog',
  })
  @Post()
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 11, saveImageToStorage))
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.blogsService.create(createBlogDto, files, files[0]);
  }

  @ApiOperation({
    summary: 'find    the all Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return  all the    blog',
  })
  @Get()
  findAll(@Query() query: FindAllBlogsQueryDto) {
    return this.blogsService.findAll(query);
  }

  @ApiOperation({
    summary: 'find   the  Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the single blog',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update    the  Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the updated blog',
  })
  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @ApiOperation({
    summary: 'delete the  Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'It will return the deleted blog',
  })
  @Delete(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
