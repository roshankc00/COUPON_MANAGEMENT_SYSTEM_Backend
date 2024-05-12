import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { EntityManager, Repository } from 'typeorm';
import { Seo } from '../../src/common/entity/Seo.entity';
import { CategoryService } from '../../src/category/category.service';
import { FindAllSubCategoryQueryDto } from './dto/findAll.sub-categories.dto';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    private readonly entityManager: EntityManager,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const categoryExist = await this.categoryService.findOne(
      +createSubCategoryDto.categoryId,
    );
    if (!categoryExist) {
      throw new NotFoundException();
    }
    const seo = new Seo({
      title: createSubCategoryDto.seo.title,
      description: createSubCategoryDto.seo.description,
    });
    const subCat = new SubCategory({
      category: categoryExist,
      seo,
      description: createSubCategoryDto.description,
      title: createSubCategoryDto.title,
      status: createSubCategoryDto.status,
    });
    return this.entityManager.save(subCat);
  }

  async findAll(query: FindAllSubCategoryQueryDto) {
    const { categoryId, page, pageSize } = query;
    const queryBuilder =
      this.subCategoryRepository.createQueryBuilder('subcategory');
    if (categoryId) {
      queryBuilder.andWhere('subcategory.categoryId = :categoryId', {
        categoryId,
      });
    }
    if (page && pageSize) {
      const totalItems = await queryBuilder.getCount();
      const totalPages = Math.ceil(totalItems / pageSize);
      if (query.page) {
        const skip = (+page - 1) * +pageSize;
        queryBuilder.skip(+skip).take(+pageSize);
      }
      return {
        subcategories: await queryBuilder
          .leftJoinAndSelect('subcategory.category', 'category')
          .leftJoinAndSelect('subcategory.seo', 'seo')
          .getMany(),
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      return await queryBuilder
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('subcategory.seo', 'seo')
        .getMany();
    }
  }
  findOne(id: number) {
    return this.subCategoryRepository.findOne({
      where: { id },
      relations: {
        category: true,
        seo: true,
      },
      select: {
        seo: {
          description: true,
          title: true,
        },
        category: {
          id: true,
          title: true,
        },
      },
    });
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCatExist = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCatExist) {
      throw new NotFoundException();
    }
    if (updateSubCategoryDto?.categoryId) {
      const newCat = await this.categoryService.findOne(
        updateSubCategoryDto.categoryId,
      );
      if (!subCatExist) {
        throw new NotFoundException();
      }
      subCatExist.category = newCat;
    }
    const updSuCat = Object.assign(subCatExist, updateSubCategoryDto);
    return this.entityManager.save(updSuCat);
  }

  async remove(id: number) {
    const subCatExist = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCatExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(subCatExist);
  }
}
