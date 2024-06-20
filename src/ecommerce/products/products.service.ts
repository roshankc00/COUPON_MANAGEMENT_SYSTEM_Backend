import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Repository } from 'typeorm';
import { GetProductDto } from './dto/get-product.dto';
import { AzureBulbStorageService } from '../../common/blubstorage/blubstorage.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
    private readonly azureBulbStorageService: AzureBulbStorageService,
  ) {}
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException();
    }
    const { description, product_type, title } = createProductDto;
    const image = await this.azureBulbStorageService.uploadImage(file);
    const product = new Product({
      title,
      description,
      product_type,
      bulbName: image.blobName,
      imageUrl: image.imageUrl,
    });
    return this.entityManager.save(product);
  }

  findAll(getProductDto: GetProductDto) {
    const { product_type } = getProductDto;
    if (product_type) {
      return this.productRepository.find({
        where: {
          product_type,
        },
      });
    } else {
      return this.productRepository.find({});
    }
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    const productExist = await this.productRepository.findOne({
      where: { id },
      select: {
        bulbName: true,
        id: true,
      },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    let updProduct;
    if (file) {
      await this.azureBulbStorageService.deleteImage(productExist.bulbName);
      const uploadedfile = await this.azureBulbStorageService.uploadImage(file);
      updProduct = Object.assign(productExist, {
        ...updateProductDto,
        imageUrl: uploadedfile.imageUrl,
        bulbName: uploadedfile.blobName,
      });
    } else {
      updProduct = Object.assign(productExist, updateProductDto);
    }
    return this.entityManager.save(updProduct);
  }

  async remove(id: number) {
    const productExist = await this.productRepository.findOne({
      where: { id },
      select: {
        bulbName: true,
        id: true,
      },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    await this.azureBulbStorageService.deleteImage(productExist.bulbName);
    return this.productRepository.remove(productExist);
  }

  async getAllPropuctWithoutLicense() {}
}
