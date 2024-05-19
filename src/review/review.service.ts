import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

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
}
