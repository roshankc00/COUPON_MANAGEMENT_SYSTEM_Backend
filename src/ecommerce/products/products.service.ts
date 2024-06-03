import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createProductDto: CreateProductDto) {
    const { description, price, product_type, title } = createProductDto;
    const product = new Product({
      title,
      description,
      price,
      product_type,
    });
    return this.entityManager.save(product);
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    const updProduct = Object.assign(productExist, updateProductDto);
    return this.entityManager.save(updProduct);
  }

  async remove(id: number) {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    return this.productRepository.remove(productExist);
  }
}
