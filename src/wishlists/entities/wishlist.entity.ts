import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  W,
} from 'typeorm';

@Entity()
export class Wishlist extends AbstractEntity<Wishlist> {
  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn()
  user: User;

  @OneToMany(() => Coupon, (cou) => cou.wishlist)
  coupons: Coupon[];
}
