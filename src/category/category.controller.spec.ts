import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../src/category/category.service';
import { Category } from '../../src/category/entities/category.entity';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { CategoryController } from './category.controller';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;
  let entityManager: EntityManager;
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
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

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    entityManager = module.get<EntityManager>(EntityManager);
    controller = module.get<CategoryController>(CategoryController);
  });
  describe('get all the categories', () => {
    it('should return the array of the categoried', async () => {
      const id = 2;
      const categories = [
        {
          id: 2,
          createdAt: '2024-05-08T13:11:22.406Z',
          updatedAt: '2024-05-08T13:11:22.406Z',
          title: 'Foods',
          description: 'the best food in the town',
          imageName: '76845b4a-2ad9-4ad1-bfee-f4e8e5971e4e.png',
          status: 'enabled',
          showInMenu: false,
          featured: false,
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
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(categories as any);
      const result = await controller.findAll();
      expect(result).toEqual(categories);
    });
  });
  describe('get single category', () => {
    it('should return the single  category details', async () => {
      const id = 2;
      const category = {
        id: 2,
        createdAt: '2024-05-08T13:11:22.406Z',
        updatedAt: '2024-05-08T13:11:22.406Z',
        title: 'Foods',
        description: 'the best food in the town',
        imageName: '76845b4a-2ad9-4ad1-bfee-f4e8e5971e4e.png',
        status: 'enabled',
        showInMenu: false,
        featured: false,
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
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(category as any);
      const result = await controller.findOne(id.toString());

      expect(result).toEqual(category);
    });
  });
  describe('remove the category', () => {
    it('should delete the catagory from database', async () => {
      const id = 1;
      const removeCategory: Category = {
        coupons: [],
        title: 'updateSubCategoryDto.title',
        description: 'updateSubCategoryDto.description',
        imageName: 'imagename',
        status: STATUS_ENUM.disabled,
        showInMenu: false,
        featured: false,
        seo: {
          title: 'updateSubCategoryDto.title',
          description: 'updateSubCategoryDto.description',
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        subcategories: [],
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removeCategory);

      const result = await controller.remove(id.toString());

      expect(result).toEqual(removeCategory);
    });
  });
  describe('update the category', () => {
    it('should update the category and return the updated one', async () => {
      const id = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };
      const updatedCategory: Category = {
        coupons: [],
        title: 'Updated Title',
        description: 'Updated Description',
        imageName: 'imagename',
        status: STATUS_ENUM.disabled,
        showInMenu: false,
        featured: false,
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        subcategories: [],
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);
      const result = await controller.update(id.toString(), updateCategoryDto);
      expect(result.title).toEqual(updateCategoryDto.title);
    });
  });
});
