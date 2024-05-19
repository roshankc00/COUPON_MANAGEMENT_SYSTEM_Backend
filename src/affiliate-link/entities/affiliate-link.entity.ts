import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class AffiliateLink extends AbstractEntity<AffiliateLink> {
  @Column()
  link: string;

  @Column()
  merchant: string;

  @Column()
  clicks: number;

  @Column()
  couponId: number;

  @OneToMany(() => Coupon, (coupon) => coupon.affiliateLink)
  @JoinColumn({ name: 'couponId' })
  coupons: Coupon[];
}
