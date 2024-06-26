import { Follower } from '../../../src/followers/entities/follower.entity';
import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Seo } from '../../../src/common/entity/Seo.entity';
import { STATUS_ENUM } from '../../../src/common/enums/status.enum';
import { Coupon } from '../../../src/coupons/entities/coupon.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AffiliateLink } from 'src/affiliate-link/entities/affiliate-link.entity';

@Entity()
export class Store extends AbstractEntity<Store> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ select: false })
  bulbName: string;

  @Column()
  imageUrl: string;

  @Column({
    type: Boolean,
    default: false,
  })
  featured: boolean;

  @OneToMany(() => Coupon, (coupon) => coupon.store)
  coupons: Coupon[];

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @OneToOne(() => AffiliateLink, (affiliateLink) => affiliateLink.store, {
    cascade: true,
  })
  affiliateLink: AffiliateLink;

  @OneToMany(() => Follower, (follower) => follower.store)
  followers: Follower[];

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;
}
