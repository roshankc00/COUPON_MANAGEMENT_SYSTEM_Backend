import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { EntityManager, Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../src/category/category.service';
import { Category } from '../../src/category/entities/category.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { NotFoundException } from '@nestjs/common';
import { Seo } from '../../src/common/entity/Seo.entity';

describe('SubCategoriesController', () => {
  let service: SubCategoriesService;
  let subCategoryRepository: Repository<SubCategory>;
  let categoryRepository: Repository<Category>;
  let entityManager: EntityManager;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCategoriesController],
      providers: [
        SubCategoriesService,
        CategoryService,
        {
          provide: getRepositoryToken(SubCategory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
        {
          provide: EntityManager,
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<SubCategoriesService>(SubCategoriesService);
    subCategoryRepository = module.get<Repository<SubCategory>>(
      getRepositoryToken(SubCategory),
    );
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(SubCategory),
    );
    entityManager = module.get<EntityManager>(EntityManager);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('subcategoryService   -> create the subcategory', () => {
    it('Should create the sub category and return it back to the controller', async () => {
      expect(service.create).toBeDefined();

      const createSubCategoryDto: CreateSubCategoryDto = {
        title: 'Test Title',
        description: 'Test Description',
        categoryId: 1,
        status: STATUS_ENUM.disabled,
        seo: { title: 'SEO Title', description: 'SEO Description' },
      };
      const category = new Category({
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
      });
      const createdSubCategory: SubCategory = {
        id: 1,
        title: createSubCategoryDto.title,
        description: createSubCategoryDto.description,
        category: category,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        coupons: [],
        seo: {
          title: createSubCategoryDto.seo.title,
          description: createSubCategoryDto.seo.description,
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(entityManager, 'save').mockResolvedValue(createdSubCategory);
      jest.spyOn(categoryService, 'findOne').mockResolvedValue(category);
      const result = await service.create(createSubCategoryDto);
      expect(result).toEqual(createdSubCategory);
    });
  });

  describe('findOne subCategory', () => {
    it('should return the single subcategory', async () => {
      const id = 1;
      const subCategory = {
        id: 1,
        createdAt: '2024-05-08T13:22:04.451Z',
        updatedAt: '2024-05-08T13:22:04.451Z',
        title: 'foods',
        description: 'this is the best one',
        status: 'enabled',
        category: {
          id: 2,
          title: 'Foods',
          subcategories: [
            {
              id: 1,
              createdAt: '2024-05-08T13:22:04.451Z',
              updatedAt: '2024-05-08T13:22:04.451Z',
              title: 'foods',
              description: 'this is the best one',
              status: 'enabled',
            },
          ],
        },
        seo: {
          title: 'foods updated',
          description: 'this is the best one',
        },
      };

      jest
        .spyOn(subCategoryRepository, 'findOne')
        .mockResolvedValue(subCategory as any);

      const result = await service.findOne(id);
      expect(result).toEqual(subCategory);
    });
  });

  describe('findAll Subcategories', () => {
    it('should return array of the  subcategoried', async () => {
      const subCategories: SubCategory[] = [
        {
          id: 1,
          title: 'createSubCategoryDto.title',
          description: 'createSubCategoryDto.description',
          category: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: STATUS_ENUM.disabled,
          coupons: [],
          seo: {
            title: 'createSubCategoryDto.title',
            description: 'createSubCategoryDto.description',
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
      jest
        .spyOn(subCategoryRepository, 'find')
        .mockResolvedValue(subCategories);

      const result = await service.findAll();

      expect(result).toEqual(subCategories);
    });
  });

  describe('should update and return the category', () => {
    it('should update the subcategory and return it back', async () => {
      const id = 1;
      const updateSubCategoryDto: UpdateSubCategoryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };
      const existSubcategory = new SubCategory({});
      (existSubcategory.id = 1),
        (existSubcategory.title = 'Updated Title'),
        (existSubcategory.description = 'Updated Description'),
        (existSubcategory.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));

      const updatedSubCategory = {
        ...existSubcategory,
        ...updateSubCategoryDto,
      };
      jest
        .spyOn(subCategoryRepository, 'findOne')
        .mockResolvedValue(existSubcategory);
      jest.spyOn(entityManager, 'save').mockResolvedValue(updatedSubCategory);

      const result = await service.update(id, updateSubCategoryDto);
      expect(result).toEqual(updatedSubCategory);
    });
  });

  describe('delete the subcategory', () => {
    it('should delete the subcategory', async () => {
      const id = 1;
      const existSubcategory = new SubCategory({});
      (existSubcategory.id = 1),
        (existSubcategory.title = 'Updated Title'),
        (existSubcategory.description = 'Updated Description'),
        (existSubcategory.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));
      jest
        .spyOn(subCategoryRepository, 'findOne')
        .mockResolvedValue(existSubcategory);
      jest
        .spyOn(subCategoryRepository, 'remove')
        .mockResolvedValue(existSubcategory);

      jest
        .spyOn(entityManager, 'remove')
        .mockResolvedValue(existSubcategory as any);

      const result = await service.remove(id);

      expect(result).toEqual(existSubcategory);
    });
  });
});
