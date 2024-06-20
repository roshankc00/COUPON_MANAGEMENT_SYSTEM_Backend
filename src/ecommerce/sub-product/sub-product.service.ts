import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubProductDto } from './dto/create-sub-product.dto';
import { UpdateSubProductDto } from './dto/update-sub-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubProduct } from './entities/sub-product.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class SubProductService {
  constructor(
    @InjectRepository(SubProduct)
    private readonly subProductRepository: Repository<SubProduct>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createSubProductDto: CreateSubProductDto) {
    const { description, price, productId, title } = createSubProductDto;
    const subProduct = new SubProduct({
      title,
      description,
      price,
      productId,
    });
    return this.entityManager.save(subProduct);
  }

  findAll() {
    return this.subProductRepository.find({});
  }

  async findOne(id: number) {
    const subProduct = await this.subProductRepository.findOne({
      where: {
        id,
      },
    });
    if (!subProduct) {
      throw new BadRequestException();
    }
    return subProduct;
  }
  async update(id: number, updateSubProductDto: UpdateSubProductDto) {
    const subProduct = await this.subProductRepository.findOne({
      where: {
        id,
      },
    });
    if (!subProduct) {
      throw new BadRequestException();
    }
    const updSubProduct = Object.assign(subProduct, updateSubProductDto);
    return this.entityManager.save(updSubProduct);
  }

  async remove(id: number) {
    const subProduct = await this.subProductRepository.findOne({
      where: {
        id,
      },
    });
    if (!subProduct) {
      throw new BadRequestException();
    }
    return this.entityManager.remove(subProduct);
  }
}
