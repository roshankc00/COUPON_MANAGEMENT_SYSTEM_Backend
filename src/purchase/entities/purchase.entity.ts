import { Cashback } from 'src/cashback/entities/cashback.entity';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Purchase extends AbstractEntity<Purchase> {
  @Column()
  amount: number;

  @Column()
  couponId: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.purchases)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;

  @OneToMany(() => Cashback, (cashback) => cashback.purchase)
  cashbacks: Cashback[];
}
