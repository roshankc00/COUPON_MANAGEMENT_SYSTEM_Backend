import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Coupon } from '../../../src/coupons/entities/coupon.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends AbstractEntity<Wishlist> {
  @Column()
  userId: number;

  @Column()
  couponId: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Coupon, (cou) => cou.wishlists)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;
}
