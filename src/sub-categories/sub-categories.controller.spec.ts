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

describe('SubCategoriesController', () => {
  let controller: SubCategoriesController;
  let service: SubCategoriesService;
  let subCategoryRepository: Repository<SubCategory>;
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
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SubCategoriesController>(SubCategoriesController);
    service = module.get<SubCategoriesService>(SubCategoriesService);
    subCategoryRepository = module.get<Repository<SubCategory>>(
      getRepositoryToken(SubCategory),
    );
    entityManager = module.get<EntityManager>(EntityManager);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('create subcategory', () => {
    it('should create a subcategory', async () => {
      const createSubCategoryDto: CreateSubCategoryDto = {
        title: 'Test Title',
        description: 'Test Description',
        categoryId: 1,
        status: STATUS_ENUM.disabled,
        seo: { title: 'SEO Title', description: 'SEO Description' },
      };
      const createdSubCategory: SubCategory = {
        id: 1,
        title: createSubCategoryDto.title,
        description: createSubCategoryDto.description,
        category: null,
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

      jest.spyOn(service, 'create').mockResolvedValue(createdSubCategory);

      const result = await controller.create(createSubCategoryDto);

      expect(result).toEqual(createdSubCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of subcategories', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(subCategories);

      const result = await controller.findAll();

      expect(result).toEqual(subCategories);
    });
  });
  describe('findOne', () => {
    it('should return a subcategory with the given ID', async () => {
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

      const id = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(subCategory as any);

      const result = await controller.findOne(id);

      expect(result).toEqual(subCategory);
    });
  });

  describe('Update the subcategory', () => {
    it('should update the subcategory and return the subcategory', async () => {
      const id = 1;
      const updateSubCategoryDto: UpdateSubCategoryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };

      const updatedSubcategory: SubCategory = {
        id: 1,
        title: updateSubCategoryDto.title,
        description: updateSubCategoryDto.description,
        category: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        coupons: [],
        seo: {
          title: updateSubCategoryDto.seo.title,
          description: updateSubCategoryDto.seo.description,
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedSubcategory);
      const result = await controller.update(
        id.toString(),
        updateSubCategoryDto,
      );
      expect(result).toEqual(updatedSubcategory);
    });
  });

  describe('delete the subcategory', () => {
    it('should delete the subcategory and return it ', async () => {
      const id = 1;

      const removedSubCategory: SubCategory = {
        id: 1,
        title: 'updateSubCategoryDto.title',
        description: 'updateSubCategoryDto.description',
        category: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        coupons: [],
        seo: {
          title: 'updateSubCategoryDto.title',
          description: 'updateSubCategoryDto.description',
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedSubCategory);

      const result = await controller.remove(id.toString());

      expect(result).toEqual(removedSubCategory);
    });
  });
});
