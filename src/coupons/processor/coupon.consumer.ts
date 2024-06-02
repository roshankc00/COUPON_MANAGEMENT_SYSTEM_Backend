import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGE_QUEUE } from '../constants/index.js';
import { Coupon } from '../entities/coupon.entity.js';
import { CouponsService } from '../coupons.service.js';
import { EmailService } from 'src/common/email/email.service';
import { ConfigService } from '@nestjs/config';
import dataSource from 'typeorm.config';
import { Follower } from 'src/followers/entities/follower.entity.js';
import { Store } from 'src/store/entities/store.entity.js';

interface IJob {
  store: Store;
}

@Processor(MESSAGE_QUEUE)
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(Coupon)
    private readonly couponsService: CouponsService,
    private readonly configService: ConfigService,
  ) {}

  @Process()
  async createMessage(job: Job<IJob>) {
    const { store } = job.data;
    try {
      await Promise.all(
        store.followers.map(async (item) => {
          try {
            await this.emailService.notifyUserFavStoreUpdate({
              email: item.user.email,
              storeName: store.title,
              userName: item.user.name,
              subject: 'Nepque Coupon Alert',
              url: `${this.configService.get('CLIENT_URL')}/user/browse/store/${store.id}`,
              template: 'notifyuser.ejs',
            });
          } catch (error) {
            this.logger.error(
              `Error sending email to user: ${item.user.email}, error: ${error.message}`,
            );
          }
        }),
      );
    } catch (error) {
      this.logger.error(
        `Error processing job: ${job.id}, error: ${error.message}`,
      );
    }
  }
}
