import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Not, QueryFailedError, Repository } from 'typeorm';
import { GetProductDto } from './dto/get-product.dto';
import { AzureBulbStorageService } from '../../common/blubstorage/blubstorage.service';
import { ToggleProductStatusDto } from './dto/changeProductStatus.dto';
import slugify from 'slugify';
import { GetDataWithSlugDto } from 'src/common/dtos/getwithslug.dto';
import { UpdateSubProductTitleDto } from './dto/updateSubProduct';

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
        title,
        description,
        product_type,
        appstoreLink,
        slug,
        playstoreLink,
        fields,
        tags,
      } = createProductDto;

      const itemExistWithSlug = await this.productRepository.findOne({
        where: { slug: slugify(slug) },
      });
      if (itemExistWithSlug) {
        throw new BadRequestException();
      }
      const image = await this.azureBulbStorageService.uploadImage(files[0]);
      const tooltipImage = await this.azureBulbStorageService.uploadImage(
        files[1],
      );
      // console.log(slugify(slug));
      const product = new Product({
        title,
        description,
        product_type,
        bulbName: image.blobName,
        slug: slugify(slug),
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
      .orderBy('product.updatedAt', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const productExist = await this.productRepository.findOne({
      where: { id },
      relations: { subProductItems: true },
      select: {
        subProductItems: true,
      },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    return productExist;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const { isImage, isTooltipImage } = updateProductDto;

    if (updateProductDto?.slug) {
      updateProductDto.slug = slugify(updateProductDto.slug);
    }
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
    if (files && files?.length >= 1) {
      if (Boolean(isImage) && Boolean(isTooltipImage)) {
        if (productExist.bulbName) {
          try {
            await this.azureBulbStorageService.deleteImage(
              productExist.bulbName,
            );
          } catch (error) {
            console.log(error);
          }
        }
        if (productExist.toolTipImagebulbName) {
          try {
            await this.azureBulbStorageService.deleteImage(
              productExist.toolTipImagebulbName,
            );
          } catch (error) {
            console.log(error);
          }
        }

        const uploadedImagefile =
          await this.azureBulbStorageService.uploadImage(files[0]);
        const uploadedTooltipfile =
          await this.azureBulbStorageService.uploadImage(files[1]);
        updProduct = Object.assign(productExist, {
          ...updateProductDto,
          imageUrl: uploadedImagefile.imageUrl,
          bulbName: uploadedImagefile.blobName,
          toolTipImagebulbName: uploadedTooltipfile.blobName,
          toolTipImageUrl: uploadedTooltipfile.imageUrl,
        });
      } else if (Boolean(isImage)) {
        if (productExist.bulbName) {
          try {
            await this.azureBulbStorageService.deleteImage(
              productExist.bulbName,
            );
          } catch (error) {
            console.log(error);
          }
        }
        const uploadedfile = await this.azureBulbStorageService.uploadImage(
          files[0],
        );
        updProduct = Object.assign(productExist, {
          ...updateProductDto,
          imageUrl: uploadedfile.imageUrl,
          bulbName: uploadedfile.blobName,
        });
      } else if (Boolean(isTooltipImage)) {
        if (productExist.toolTipImagebulbName) {
          try {
            await this.azureBulbStorageService.deleteImage(
              productExist.toolTipImagebulbName,
            );
          } catch (error) {
            console.log(error);
          }
        }
        const uploadedTooltipfile =
          await this.azureBulbStorageService.uploadImage(files[0]);
        updProduct = Object.assign(productExist, {
          toolTipImagebulbName: uploadedTooltipfile.blobName,
          toolTipImageUrl: uploadedTooltipfile.imageUrl,
        });
        console.log(uploadedTooltipfile);
      }
    } else {
      updProduct = Object.assign(productExist, updateProductDto);
    }
    delete updProduct.isImage;
    delete updProduct.isTooltipImage;
    updProduct.updatedAt = new Date();
    return this.entityManager.save(updProduct);
  }

  async remove(id: number) {
    try {
      const productExist = await this.productRepository.findOne({
        where: { id },
        select: {
          bulbName: true,
          id: true,
          toolTipImagebulbName: true,
        },
      });
      if (!productExist) {
        throw new NotFoundException();
      }

      await this.productRepository.remove(productExist);

      if (productExist?.bulbName) {
        try {
          await this.azureBulbStorageService.deleteImage(productExist.bulbName);
        } catch (error) {
          console.log(error);
        }
      }
      if (productExist?.toolTipImagebulbName) {
        try {
          await this.azureBulbStorageService.deleteImage(
            productExist?.toolTipImagebulbName,
          );
        } catch (error) {
          console.log(error);
        }
      }
      return {
        success: true,
        message: 'Deleted successfully',
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('You Cant delete it  ');
      } else {
        throw error;
      }
    }
  }

  async toggleProductPublishStatus(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    console.log(product?.isPublished);
    if (product?.isPublished) {
      product.isPublished = false;
    } else {
      product.isPublished = true;
    }
    return this.entityManager.save(product);
  }

  async getAllProductForUser(getProductDto: GetProductDto) {
    const { no } = getProductDto;
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.isPublished = :isPublished', { isPublished: true });

    if (no) {
      queryBuilder.take(+no);
    }

    queryBuilder
      .leftJoinAndSelect('product.subProductItems', 'subProductItems')
      .orderBy('product.updatedAt', 'DESC');

    return await queryBuilder.getMany();
  }

  async getProductWithSlug(getDataWithSlugDto: GetDataWithSlugDto) {
    const { slug } = getDataWithSlugDto;
    const productExist = await this.productRepository.findOne({
      where: { slug },
      relations: { subProductItems: true },
      select: {
        subProductItems: true,
      },
    });
    if (!productExist) {
      throw new NotFoundException();
    }
    return productExist;
  }

  async updateSubProductTitle(
    id: number,
    updateSubProductTitleDto: UpdateSubProductTitleDto,
  ) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    product.subProductTitle = updateSubProductTitleDto.subProductTitle;
    await this.entityManager.save(product);
    return {
      success: true,
      message: 'Title updated successfully',
    };
  }
}
