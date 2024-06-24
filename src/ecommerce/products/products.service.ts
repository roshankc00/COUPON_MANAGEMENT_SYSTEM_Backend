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
  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    try {
      if (!files && files.length >= 2) {
        throw new BadRequestException();
      }
      const {
        description,
        product_type,
        title,
        fields,
        tags,
        appstoreLink,
        playstoreLink,
      } = createProductDto;
      const image = await this.azureBulbStorageService.uploadImage(files[0]);
      const tooltipImage = await this.azureBulbStorageService.uploadImage(
        files[1],
      );
      const product = new Product({
        title,
        description,
        product_type,
        bulbName: image.blobName,
        imageUrl: image.imageUrl,
        toolTipImagebulbName: tooltipImage.blobName,
        toolTipImageUrl: tooltipImage.imageUrl,
        fields,
        tags,
        appstoreLink,
        playstoreLink,
      });
      return this.entityManager.save(product);
    } catch (error) {
      console.log(error);
    }
  }

  findAll(getProductDto: GetProductDto) {
    const { product_type, no } = getProductDto;
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    if (product_type) {
      return this.productRepository.find({
        where: {
          product_type,
        },
      });
    }
    if (no) {
      queryBuilder.take(+no);
    }
    return queryBuilder
      .leftJoinAndSelect('product.subProductItems', 'subProductItems')
      .getMany();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: { subProductItems: true },
      select: {
        subProductItems: true,
      },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const { isImage, isTooltipImage } = updateProductDto;
    const productExist = await this.productRepository.findOne({
      where: { id },
      select: {
        bulbName: true,
        toolTipImagebulbName: true,
        id: true,
      },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    let updProduct;
    if (files && files?.length > 1) {
      if (isImage) {
        await this.azureBulbStorageService.deleteImage(productExist.bulbName);
        const uploadedfile = await this.azureBulbStorageService.uploadImage(
          files[0],
        );
        updProduct = Object.assign(productExist, {
          ...updateProductDto,
          imageUrl: uploadedfile.imageUrl,
          bulbName: uploadedfile.blobName,
        });
      }
      if (isTooltipImage) {
        if (productExist.toolTipImagebulbName) {
          await this.azureBulbStorageService.deleteImage(
            productExist.toolTipImagebulbName,
          );
        }
        const uploadedTooltipfile =
          await this.azureBulbStorageService.uploadImage(files[0]);
        updProduct = Object.assign(productExist, {
          toolTipImagebulbName: uploadedTooltipfile.imageUrl,
          toolTipImageUrl: uploadedTooltipfile.blobName,
        });
      }
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
