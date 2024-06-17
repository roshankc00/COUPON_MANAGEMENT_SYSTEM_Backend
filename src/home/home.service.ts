import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { EntityManager, Repository } from 'typeorm';
import { AzureBulbStorageService } from 'src/common/blubstorage/blubstorage.service';
import { HomeItem } from './entities/homepage.item.entity';
import { timeStamp } from 'console';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) private readonly homeRepository: Repository<Home>,
    @InjectRepository(HomeItem)
    private readonly homeItemRepository: Repository<HomeItem>,
    private readonly entityManager: EntityManager,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(files: Express.Multer.File[]) {
    const homeItem = await this.homeRepository.find({});
    if (homeItem.length > 0) {
      throw new BadRequestException(
        'Home item already exist try adding the item ',
      );
    }
    const sliderImages = await Promise.all(
      files.map(async (file) => {
        const data = await this.azureBulbStorageService.uploadImage(file);
        return new HomeItem({
          bulbName: data.blobName,
          imageUrl: data.imageUrl,
        });
      }),
    );

    const home = new Home({
      homeItem: sliderImages,
    });
    return this.entityManager.save(home);
  }

  async addItems(files: Express.Multer.File[]) {
    const homeExist = await this.homeRepository.find({
      relations: {
        homeItem: true,
      },
    });
    if (!homeExist) {
      throw new BadRequestException('Home doesnt exist');
    }
    const sliderImages = await Promise.all(
      files.map(async (file) => {
        const data = await this.azureBulbStorageService.uploadImage(file);
        return new HomeItem({
          bulbName: data.blobName,
          imageUrl: data.imageUrl,
        });
      }),
    );
    const updatedSliderImages = [...homeExist[0].homeItem, ...sliderImages];

    homeExist[0].homeItem = updatedSliderImages;
    return this.entityManager.save(homeExist);
  }
  findAll() {
    return this.homeRepository.find({
      relations: {
        homeItem: true,
      },
    });
  }

  async removeHomeData() {
    const homeData = await this.homeRepository.find({
      relations: {
        homeItem: true,
      },
      select: {
        homeItem: {
          bulbName: true,
        },
      },
    });

    await Promise.all(
      homeData[0]?.homeItem.map(async (item) => {
        await this.azureBulbStorageService.deleteImage(item.bulbName);
      }),
    );

    return this.entityManager.remove(homeData);
  }

  async deleteSingleImage(id: number) {
    const item = await this.homeItemRepository.findOne({
      where: { id },
      select: {
        bulbName: true,
        id: true,
      },
    });
    if (!item) {
      throw new NotFoundException();
    }
    const delImageid = item.bulbName;

    await this.azureBulbStorageService.deleteImage(delImageid);
    return this.entityManager.remove(item);
  }
}
