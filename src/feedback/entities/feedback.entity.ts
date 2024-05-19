import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Feedback extends AbstractEntity<Feedback> {
  @Column()
  content: string;

  @Column()
  couponId: number;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @ManyToOne(() => Coupon, (cou) => cou.feedbacks)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;
}
