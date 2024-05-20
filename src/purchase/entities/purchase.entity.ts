import { AffiliateLink } from 'src/affiliate-link/entities/affiliate-link.entity';
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
  affiliateLinkId: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => AffiliateLink, (affiliateLink) => affiliateLink.purchases)
  @JoinColumn({ name: 'affiliateLinkId' })
  affiliateLink: AffiliateLink;

  @OneToMany(() => Cashback, (cashback) => cashback.purchase)
  cashbacks: Cashback[];
}
