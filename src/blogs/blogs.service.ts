import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BlogItem } from './entities/blog-item.entity';
import { FindAllBlogsQueryDto } from './dto/find-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(
    createBlogDto: CreateBlogDto,
    files: Express.Multer.File[],
    thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      throw new BadRequestException('Thumbnail field is required');
    }
    const blog = new Blog({
      title: createBlogDto.title,
      description: createBlogDto.description,
      thumbnail: thumbnail.filename,
    });

    const savedBlog = await this.entityManager.save(blog);
    let count = 1;
    const savedBlogItems = await Promise.all(
      createBlogDto.items.map(async (itemDto, index) => {
        const blogItem = new BlogItem({});
        blogItem.title = itemDto.title;
        blogItem.content = itemDto.content;
        if (itemDto.isImage) {
          blogItem.imageName = files[count]?.filename;
          count++;
        } else {
          blogItem.imageName = null;
        }
        blogItem.blog = savedBlog;
        return await this.entityManager.save(blogItem);
      }),
    );

    return savedBlog;
  }

  async findAll(query: FindAllBlogsQueryDto) {
    const { page, pageSize } = query;
    const totalItems = await this.blogRepository
      .createQueryBuilder()
      .getCount();
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page && pageSize) {
      const skip = (+page - 1) * +pageSize;
      return {
        blogs: await this.blogRepository
          .createQueryBuilder('coupon')
          .orderBy('coupon.createdAt', 'DESC')
          .skip(+skip)
          .take(+pageSize)
          .getMany(),
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      return this.blogRepository
        .createQueryBuilder('coupon')
        .orderBy('coupon.createdAt', 'DESC')
        .getMany();
    }
  }

  findOne(id: number) {
    return this.blogRepository.findOne({
      where: { id },
      relations: ['blogItems'],
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blogExist = await this.blogRepository.findOne({
      where: { id },
      relations: { blogItems: true },
    });
    if (!blogExist) {
      throw new NotFoundException();
    }
    const updBlog = Object.assign(blogExist, updateBlogDto);
    return this.entityManager.save(updBlog);
  }

  async remove(id: number) {
    const blogExist = await this.blogRepository.findOne({
      where: { id },
    });
    if (!blogExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(blogExist);
  }
}
