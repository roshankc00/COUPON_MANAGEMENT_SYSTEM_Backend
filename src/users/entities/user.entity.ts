import { Follower } from '../../../src/followers/entities/follower.entity';
import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { USER_ROLE_ENUM } from '../../../src/common/enums/user.role.enum';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Wishlist } from '../../../src/wishlists/entities/wishlist.entity';
import { Review } from 'src/review/entities/review.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Cashback } from 'src/cashback/entities/cashback.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { SubmitOffer } from 'src/submit-offer/entities/submit-offer.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @Column({ type: Boolean, default: false })
  isVerified: boolean;

  @OneToMany(() => Follower, (follower) => follower.user)
  followers: Follower[];

  @OneToOne(() => Wishlist, (wish) => wish.user)
  wishlist: Wishlist;

  @OneToMany(() => Review, (rev) => rev.user)
  reviews: Review[];

  @OneToMany(() => Purchase, (pur) => pur.user)
  purchases: Purchase[];

  @OneToMany(() => Cashback, (cashback) => cashback.user)
  cashbacks: Cashback[];

  @OneToMany(() => SubmitOffer, (offer) => offer.user)
  submitOffers: SubmitOffer[];

  @Column({
    type: 'enum',
    enum: USER_ROLE_ENUM,
    default: USER_ROLE_ENUM.USER,
  })
  role: USER_ROLE_ENUM;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetDateExpire: Date;
}
