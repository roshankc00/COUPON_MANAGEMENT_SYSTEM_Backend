import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createFeedbackDto: CreateFeedbackDto) {
    const newFeedBack = new Feedback({
      ...createFeedbackDto,
    });
    return this.entityManager.save(newFeedBack);
  }

  findOne(id: number) {
    return this.feedbackRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.feedbackRepository.find({});
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedBackexist = await this.feedbackRepository.findOne({
      where: { id },
    });
    if (!feedBackexist) {
      throw new NotFoundException();
    }
    const updFeedback = Object.assign(feedBackexist, updateFeedbackDto);
    return this.entityManager.save(updFeedback);
  }

  async remove(id: number) {
    const feedBackexist = await this.feedbackRepository.findOne({
      where: { id },
    });
    if (!feedBackexist) {
      throw new NotFoundException();
    }
    return this.entityManager.remove(feedBackexist);
  }
}
