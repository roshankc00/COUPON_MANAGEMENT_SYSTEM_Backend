import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { CouponsController } from './coupons.controller';
import { GenerateAnalytics } from '../../src/common/analytics/last-12-month';
import { UpdateCouponDto } from './dto/update-coupon.dto';

describe('CouponService', () => {
  let service: CouponsService;
  let couponRepository: Repository<Coupon>;
  let entityManager: EntityManager;
  let controller: CouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponsController],
      providers: [
        CouponsService,
        GenerateAnalytics,
        {
          provide: getRepositoryToken(Coupon),
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

    service = module.get<CouponsService>(CouponsService);
    couponRepository = module.get<Repository<Coupon>>(
      getRepositoryToken(Coupon),
    );
    entityManager = module.get<EntityManager>(EntityManager);
    controller = module.get<CouponsController>(CouponsController);
  });

  describe('findOne coupon', () => {
    it('should return the single coupon', async () => {
      const id = 1;
      const coupon: Coupon = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Foods',
        description: 'the best food in the town',
        tagLine: 'the best food in the town',
        code: 'sdnsjni3edn',
        startDate: new Date(),
        expireDate: new Date(),
        url: 'ksdweo2kw',
        featured: false,
        categoryId: 2,
        subCategoryId: 1,
        storeId: 1,
        imageName: '4eee021a-778c-4f4a-a6b0-a693a5b1a200.png',
        verified: false,
        exclusive: false,
        status: STATUS_ENUM.disabled,
        category: null,
        subCategory: null,
        store: null,
        seo: null,
      };

      jest.spyOn(couponRepository, 'findOne').mockResolvedValue(coupon);

      const result = await service.findOne(id);
      expect(result).toEqual(coupon);
    });
  });

  describe('findAll coupons', () => {
    it('should return array of the  coupons', async () => {
      const coupons = [
        {
          id: 1,
          createdAt: '2024-05-08T13:22:24.129Z',
          updatedAt: '2024-05-08T13:22:24.129Z',
          title: 'Foods',
          description: 'the best food in the town',
          tagLine: 'the best food in the town',
          code: 'sdnsjni3edn',
          startDate: '2018-02-22T18:15:00.000Z',
          expireDate: '2018-02-25T18:15:00.000Z',
          url: 'ksdweo2kw',
          featured: false,
          categoryId: 2,
          subCategoryId: 1,
          storeId: 1,
          imageName: '4eee021a-778c-4f4a-a6b0-a693a5b1a200.png',
          verified: false,
          exclusive: false,
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
            id: 5,
            title: 'Foods',
          },
          subCategory: {
            id: 1,
            title: 'foods',
          },
          store: {
            id: 1,
            title: 'Foods',
          },
        },
      ];

      jest.spyOn(couponRepository, 'find').mockResolvedValue(coupons as any);

      const result = await service.findAll();

      expect(result).toEqual(coupons);
    });
  });

  describe('should update and return the coupon', () => {
    it('should update the coupon and return it back', async () => {
      const id = 1;
      const updateStoreDto: UpdateCouponDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };
      const existStore = new Coupon({});
      (existStore.id = 1),
        (existStore.title = 'Updated Title'),
        (existStore.description = 'Updated Description'),
        (existStore.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));

      const updatedStore = {
        ...existStore,
        ...updateStoreDto,
      };
      jest.spyOn(couponRepository, 'findOne').mockResolvedValue(existStore);
      jest.spyOn(entityManager, 'save').mockResolvedValue(updatedStore);

      const result = await service.update(id, updateStoreDto);
      expect(result).toEqual(updatedStore);
    });
  });

  describe('delete the coupon', () => {
    it('should delete the coupon', async () => {
      const id = 1;
      const existCoupon = new Coupon({});
      (existCoupon.id = 1),
        (existCoupon.title = 'Updated Title'),
        (existCoupon.description = 'Updated Description'),
        (existCoupon.seo = new Seo({
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        }));
      jest.spyOn(couponRepository, 'findOne').mockResolvedValue(existCoupon);
      jest.spyOn(couponRepository, 'remove').mockResolvedValue(existCoupon);

      jest.spyOn(entityManager, 'remove').mockResolvedValue(existCoupon as any);

      const result = await service.remove(id);

      expect(result).toEqual(existCoupon);
    });
  });
});
