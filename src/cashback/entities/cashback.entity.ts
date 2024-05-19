import { AbstractEntity } from 'src/common/database/abstract.entity';
import { CASHBACK_STATUS_ENUM } from 'src/common/enums/cashback.status';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cashback extends AbstractEntity<Cashback> {
  @Column()
  amount: number;

  @Column()
  couponId: number;

  @Column({
    type: 'enum',
    enum: CASHBACK_STATUS_ENUM,
    default: CASHBACK_STATUS_ENUM.pending,
  })
  status: CASHBACK_STATUS_ENUM;

  @ManyToOne(() => User, (user) => user.cashbacks)
  user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.cashbacks)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;
}
