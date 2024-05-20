import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class AffiliateLink extends AbstractEntity<AffiliateLink> {
  @Column()
  link: string;

  @Column()
  merchant: string;

  @Column()
  clicks: number;

  @OneToMany(() => Purchase, (purchase) => purchase.affiliateLink)
  purchases: Purchase[];

  @OneToMany(() => Coupon, (coupon) => coupon.affiliateLink)
  coupons: Coupon[];
}
