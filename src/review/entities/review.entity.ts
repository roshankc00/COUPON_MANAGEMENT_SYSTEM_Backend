import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review extends AbstractEntity<Review> {
  @Column()
  content: string;

  @Column({ type: 'float' })
  rating: number;

  @Column()
  couponId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Coupon, (cou) => cou.reviews)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;
}
