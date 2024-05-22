import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../src/category/category.service';
import { Category } from '../../src/category/entities/category.entity';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { CategoryController } from './category.controller';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GenerateAnalytics } from '../../src/common/analytics/getAnalytics';

describe('CategoriesService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;
  let entityManager: EntityManager;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        GenerateAnalytics,
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
      exports: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('findOne Category', () => {
    it('should return the single category', async () => {
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

      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValue(category as any);

      const result = await service.findOne(id);
      expect(result.title).toEqual(category.title);
    });
  });

  describe('findAll categories', () => {
    it('should return array of the  categories', async () => {
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

      jest
        .spyOn(categoryRepository, 'find')
        .mockResolvedValue(categories as any);

      const result = await service.findAll();

      expect(result).toEqual(categories);
    });
  });

  describe('should update and return the category', () => {
    it('should update the category and return it back', async () => {
      const id = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };
      const existCategory = new Category({});
      (existCategory.id = 1),
        (existCategory.title = 'Updated Title'),
        (existCategory.description = 'Updated Description'),
        (existCategory.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));

      const updatedCategory = {
        ...existCategory,
        ...updateCategoryDto,
      };
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValue(existCategory);
      jest.spyOn(entityManager, 'save').mockResolvedValue(updatedCategory);

      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 1234,
        buffer: Buffer.from(''),
        stream: null,
        destination: '',
        filename: '',
        path: '',
      };
      const result = await service.update(id, updateCategoryDto, file);
      expect(result).toEqual(updatedCategory);
    });
  });

  describe('delete the subcategory', () => {
    it('should delete the category', async () => {
      const id = 1;
      const existCategory = new Category({});
      (existCategory.id = 1),
        (existCategory.title = 'Updated Title'),
        (existCategory.description = 'Updated Description'),
        (existCategory.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValue(existCategory);
      jest.spyOn(categoryRepository, 'remove').mockResolvedValue(existCategory);

      jest
        .spyOn(entityManager, 'remove')
        .mockResolvedValue(existCategory as any);

      const result = await service.remove(id);

      expect(result).toEqual(existCategory);
    });
  });
});
