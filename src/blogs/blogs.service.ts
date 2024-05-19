import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogItem } from './entities/blog-item.entity';
import { EntityManager, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogItem)
    private readonly blogRepository: Repository<Blog>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createBlogDto: CreateBlogDto, files: Express.Multer.File[]) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const blog = new Blog({
          title: createBlogDto.title,
          description: createBlogDto.description,
        });

        const savedBlog = await transactionalEntityManager.save(blog);

        const blogItems = createBlogDto.blogItems.map((itemDto, index) => {
          const blogItem = new BlogItem({
            title: itemDto.title,
            content: itemDto.content,
            imageName: files[index]?.filename,
            blog: savedBlog,
          });
          return blogItem;
        });

        await transactionalEntityManager.save(blogItems);

        return savedBlog;
      },
    );
  }

  findAll() {
    return this.blogRepository.find({ relations: { blogItem: true } });
  }

  findOne(id: number) {
    return this.blogRepository.findOne({
      where: { id },
      relations: { blogItem: true },
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blogExist = await this.blogRepository.findOne({
      where: { id },
      relations: { blogItem: true },
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
