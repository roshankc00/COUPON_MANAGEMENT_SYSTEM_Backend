import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../src/category/category.service';
import { Category } from '../../src/category/entities/category.entity';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { StoreController } from './store.controller';
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

  describe('findOne store', () => {
    it('should return the single store', async () => {
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

      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(store);

      const result = await service.findOne(id);
      expect(result).toEqual(store);
    });
  });

  describe('findAll stores', () => {
    it('should return array of the  stores', async () => {
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

      jest.spyOn(storeRepository, 'find').mockResolvedValue(stores as any);

      const result = await service.findAll();

      expect(result).toEqual(stores);
    });
  });

  describe('should update and return the store', () => {
    it('should update the store and return it back', async () => {
      const id = 1;
      const updateStoreyDto: UpdateStoreDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };
      const existStore = new Store({});
      (existStore.id = 1),
        (existStore.title = 'Updated Title'),
        (existStore.description = 'Updated Description'),
        (existStore.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));

      const updatedstore = {
        ...existStore,
        ...updateStoreyDto,
      };
      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(existStore);
      jest.spyOn(entityManager, 'save').mockResolvedValue(updatedstore);

      const result = await service.update(id, updateStoreyDto);
      expect(result).toEqual(updatedstore);
    });
  });

  describe('delete the store', () => {
    it('should delete the store', async () => {
      const id = 1;
      const existStore = new Store({});
      (existStore.id = 1),
        (existStore.title = 'Updated Title'),
        (existStore.description = 'Updated Description'),
        (existStore.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));
      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(existStore);
      jest.spyOn(storeRepository, 'remove').mockResolvedValue(existStore);

      jest.spyOn(entityManager, 'remove').mockResolvedValue(existStore as any);

      const result = await service.remove(id);

      expect(result).toEqual(existStore);
    });
  });
});
