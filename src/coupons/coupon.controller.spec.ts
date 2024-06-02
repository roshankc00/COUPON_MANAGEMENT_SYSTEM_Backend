import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { STATUS_ENUM } from '../../src/common/enums/status.enum';
import { Seo } from '../../src/common/entity/Seo.entity';
import { GenerateAnalytics } from '../../src/common/analytics/getAnalytics';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { CouponsController } from './coupons.controller';
import { StoreController } from '../../src/store/store.controller';
import { Store } from 'src/store/entities/store.entity';
import { UpdateCouponDto } from './dto/update-coupon.dto';

describe('CouponController', () => {
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
  describe('get all the coupons', () => {
    it('should return the array of the coupons', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(coupons as any);

      const result = await controller.findAll({
        categoryId: 2,
        page: 1,
        pageSize: 10,
        storeId: 2,
        subCategoryIds: [2],
        subCategoryId: 0,
        categoryIds: [],
        storeIds: [],
      });

      expect(result).toEqual(coupons);
    });
  });

  describe('findOne coupon', () => {
    it('should return a coupon with the given ID', async () => {
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
        wishlists: [],
        reviews: [],
        isDeal: false,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(coupon);

      const result = await controller.findOne(id.toString());

      expect(result).toEqual(coupon);
    });
  });

  describe('Update the coupons', () => {
    it('should update the coupons and return the coupons', async () => {
      const id = 1;
      const updateCouponDto: UpdateCouponDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        seo: {
          title: 'Updated SEO Title',
          description: 'Updated SEO Description',
        },
      };

      const updatedCoupon: Coupon = {
        id: 1,
        title: updateCouponDto.title,
        description: updateCouponDto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        seo: {
          title: updateCouponDto.seo.title,
          description: updateCouponDto.seo.description,
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageName: 'kmkdmfdf.pmg',
        featured: false,
        tagLine: 'kmkdmfdf.pmg',
        code: 'kmkdmfdf.pmg',
        startDate: undefined,
        expireDate: undefined,
        categoryId: 0,
        subCategoryId: 0,
        storeId: 0,
        verified: false,
        exclusive: false,
        category: null,
        subCategory: null,
        store: null,
        reviews: [],
        isDeal: false,
        wishlists: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCoupon);
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
      const result = await controller.update(
        id.toString(),
        updateCouponDto,
        file,
      );
      expect(result).toEqual(updatedCoupon);
    });
  });

  describe('delete the coupon', () => {
    it('should delete the coupon and return it ', async () => {
      const id = 1;

      const removeCoupon: Coupon = {
        id: 1,
        title: 'updateCategoryDto.title',
        description: 'updateCategoryDto.description',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: STATUS_ENUM.disabled,
        seo: {
          title: 'updateCategoryDto.seo.title',
          description: 'updateCategoryDto.seo.description',
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        imageName: 'kmkdmfdf.pmg',
        featured: false,
        tagLine: 'kmkdmfdf.pmg',
        code: 'kmkdmfdf.pmg',
        startDate: undefined,
        expireDate: undefined,
        categoryId: 0,
        subCategoryId: 0,
        storeId: 0,
        verified: false,
        exclusive: false,
        category: null,
        subCategory: null,
        store: null,
        reviews: [],
        isDeal: false,
        wishlists: [],
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removeCoupon);

      const result = await controller.remove(id.toString());

      expect(result).toEqual(removeCoupon);
    });
  });
});
