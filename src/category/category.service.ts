import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntityManager, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Seo } from '../../src/common/entity/Seo.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly entiryManager: EntityManager,
  ) {}
  create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
    const seo = new Seo({
      title: createCategoryDto.seo.title,
      description: createCategoryDto.seo.description,
    });
    const category = new Category({
      title: createCategoryDto.title,
      description: createCategoryDto.description,
      showInMenu: createCategoryDto.showInMenu,
      featured: createCategoryDto.featured,
      seo,
      status: createCategoryDto.status,
      imageName: file.filename,
    });
    return this.entiryManager.save(category);
  }

  findAll() {
    return this.categoryRepository.find({});
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryExist) {
      throw new NotFoundException();
    }
    const newcat = Object.assign(categoryExist, updateCategoryDto);
    return this.entiryManager.save(newcat);
  }

  async remove(id: number) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryExist) {
      throw new NotFoundException();
    }
    return this.entiryManager.remove(categoryExist);
  }

  async countCategories() {
    return this.categoryRepository.count();
  }

  async search(keyword: string) {
    return await this.categoryRepository
      .createQueryBuilder('cat')
      .where('LOWER(cat.title) LIKE LOWER(:keyword)', {
        keyword: `%${keyword.toLowerCase()}%`,
      })
      .getMany();
  }
}
