import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FindReviewDto } from './dto/find.review';
import { ReviewStatusDto } from './dto/review.status.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createReviewDto: CreateReviewDto, user: User) {
    const newReview = new Review({
      ...createReviewDto,
      user,
    });
    return this.entityManager.save(newReview);
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({ where: { id } });
  }

  findAll(query: FindReviewDto) {
    return this.filter(query);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const reviewExist = await this.reviewRepository.findOne({ where: { id } });
    if (!reviewExist) {
      throw new NotFoundException();
    }
    const updReview = Object.assign(reviewExist, updateReviewDto);
    return this.entityManager.save(updReview);
  }

  async remove(id: number) {
    const reviewExist = await this.reviewRepository.findOne({ where: { id } });
    if (!reviewExist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(reviewExist);
  }

  async findReviewCountByRating({ couponId }: ReviewStatusDto) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    const reviewCountByRating = await queryBuilder
      .where('review.couponId = :couponId', { couponId: +couponId })
      .select(
        'CASE WHEN review.rating BETWEEN 1 AND 5 THEN review.rating ELSE 0 END',
        'rating',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy('rating')
      .getRawMany();

    const totalItems = await queryBuilder.getCount();

    return reviewCountByRating.map((row) => ({
      rating: row.rating,
      per: (+row.count / totalItems) * 100,
    }));
  }

  private async filter(query: FindReviewDto) {
    const { couponId, page, pageSize, searchText, rating } = query;
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');
    if (couponId) {
      queryBuilder.andWhere('review.couponId = :couponId', {
        couponId: +couponId,
      });
    }
    if (searchText) {
      queryBuilder.where('LOWER(review.content) LIKE LOWER(:keyword)', {
        keyword: `%${searchText.toLowerCase()}%`,
      });
    }

    if (rating) {
      queryBuilder.andWhere('review.rating = :rating', { rating: +rating });
    }

    if (page && pageSize) {
      const totalItems = await queryBuilder.getCount();
      const totalPages = Math.ceil(totalItems / pageSize);
      if (query.page) {
        const skip = (+page - 1) * +pageSize;
        queryBuilder.skip(+skip).take(+pageSize);
      }
      return {
        reviews: await queryBuilder
          .leftJoinAndSelect('review.user', 'user')
          .getMany(),
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      return await queryBuilder
        .leftJoinAndSelect('review.user', 'user')
        .getMany();
    }
  }
}
