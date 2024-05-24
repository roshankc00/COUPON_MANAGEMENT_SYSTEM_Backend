import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) private readonly homeRepository: Repository<Home>,
    private readonly entityManager: EntityManager,
  ) {}
  create(files: Express.Multer.File[]) {
    let sliderImages = [];
    files?.map((file) => {
      sliderImages.push(file.filename);
    });

    const home = new Home({
      sliderImages: sliderImages,
    });
    return this.entityManager.save(home);
  }

  findAll() {
    return this.homeRepository.find({});
  }

  async removeImage(name: string) {
    const homeData = await this.homeRepository.find();
    if (!homeData) {
      throw new NotFoundException();
    }

    const existingCouponIndex = homeData[0].sliderImages.findIndex(
      (item) => item === name,
    );
    if (existingCouponIndex !== -1) {
      homeData[0].sliderImages.splice(existingCouponIndex, 1);
    }
    return this.entityManager.save(homeData);
  }

  async removeHomeData() {
    const homeData = await this.homeRepository.find();
    return this.entityManager.remove(homeData);
  }
}
