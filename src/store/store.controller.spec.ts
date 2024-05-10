import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { StoreController } from './store.controller';
import { Store } from './entities/store.entity';
import { StoreService } from './store.service';
import { GenerateAnalytics } from '../../src/common/analytics/last-12-month';
import { UpdateStoreDto } from './dto/update-store.dto';

describe('CategoriesController', () => {
  let service: StoreService;
  let storeRepository: Repository<Store>;
  let entityManager: EntityManager;
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        StoreService,
        GenerateAnalytics,
        {
          provide: getRepositoryToken(Store),
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

    service = module.get<StoreService>(StoreService);
    storeRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
    entityManager = module.get<EntityManager>(EntityManager);
    controller = module.get<StoreController>(StoreController);
  });
  describe('get all the stores', () => {
    it('should return the array of the stores', async () => {
      const stores = [
        {
          id: 1,
          createdAt: '2024-05-08T13:14:55.216Z',
          updatedAt: '2024-05-08T13:14:55.216Z',
          title: 'Foods',
          description: 'the best food in the town',
          imageName: '4a8c781e-9e01-4416-b410-e42e25fb0f0d.png',
          featured: false,
          status: 'enabled',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(stores as any);

      const result = await controller.findAll();

      expect(result).toEqual(stores);
    });
  });

  describe('findOne store', () => {
    it('should return a store with the given ID', async () => {
      const id = 1;
      const store: Store = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Foods',
        description: 'the best food in the town',
        imageName: '4a8c781e-9e01-4416-b410-e42e25fb0f0d.png',
        featured: false,
        status: STATUS_ENUM.disabled,
        coupons: [],
        seo: null,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(store as any);

      const result = await controller.findOne(id.toString());

      expect(result).toEqual(store);
    });
  });

  describe('Update the store', () => {
    it('should update the store and return the subcategory', async () => {
      const id = 1;
      const updateCategoryDto: UpdateStoreDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };

      const updatedCategory: Store = {
        id: 1,
        title: updateCategoryDto.title,
        description: updateCategoryDto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        coupons: [],
        seo: {
          title: updateCategoryDto.seo.title,
          description: updateCategoryDto.seo.description,
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageName: 'kmkdmfdf.pmg',
        featured: false,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);
      const result = await controller.update(id.toString(), updateCategoryDto);
      expect(result).toEqual(updatedCategory);
    });
  });

  describe('delete the store', () => {
    it('should delete the store and return it ', async () => {
      const id = 1;

      const removeStore: Store = {
        id: 1,
        title: 'updateSubCategoryDto.title',
        description: 'updateSubCategoryDto.description',
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
        imageName: 'mdfjdnjnjdfn.png',
        featured: false,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removeStore);

      const result = await controller.remove(id.toString());

      expect(result).toEqual(removeStore);
    });
  });
});
