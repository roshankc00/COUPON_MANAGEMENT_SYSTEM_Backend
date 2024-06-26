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
import { Multer } from 'multer';
import { AzureBulbStorageService } from 'src/common/blubstorage/blubstorage.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly entiryManager: EntityManager,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Invalid File');
    }
    const seo = new Seo({
      title: createCategoryDto.seo.title,
      description: createCategoryDto.seo.description,
    });
    const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
    const category = new Category({
      title: createCategoryDto.title,
      description: createCategoryDto.description,
      showInMenu: createCategoryDto.showInMenu,
      featured: createCategoryDto.featured,
      seo,
      status: createCategoryDto.status,
      imageUrl: uploadedfile.imageUrl,
      bulbName: uploadedfile.blobName,
    });
    return this.entiryManager.save(category);
  }

  findAll() {
    return this.categoryRepository.find({});
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: {
        seo: true,
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });
    if (!categoryExist) {
      throw new NotFoundException();
    }
    let newcat: Category;
    if (!file) {
      newcat = Object.assign(categoryExist, updateCategoryDto);
    } else {
      await this.azureBulbStorageService.deleteImage(categoryExist.bulbName);
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      newcat = Object.assign(categoryExist, {
        ...updateCategoryDto,
        imageUrl: uploadedfile.imageUrl,
        bulbName: uploadedfile.blobName,
      });
    }
    return this.entiryManager.save(newcat);
  }

  async remove(id: number) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id },
      select: {
        id: true,
        bulbName: true,
      },
    });
    if (!categoryExist) {
      throw new NotFoundException();
    }
    await this.azureBulbStorageService.deleteImage(categoryExist.bulbName);

    return this.entiryManager.remove(categoryExist);
  }

  async countCategories() {
    return this.categoryRepository.count();
  }

  async search(keyword: string) {
    if (keyword) {
      return await this.categoryRepository
        .createQueryBuilder('cat')
        .where('LOWER(cat.title) LIKE LOWER(:keyword)', {
          keyword: `%${keyword.toLowerCase()}%`,
        })
        .getMany();
    } else {
      return await this.categoryRepository
        .createQueryBuilder('category')
        .orderBy('category.createdAt', 'DESC')
        .take(5)
        .getMany();
    }
  }

  async getLatestcategory(no: number = 10) {
    return this.categoryRepository.find({
      order: {
        createdAt: 'desc',
      },
      take: +no,
    });
  }
}
