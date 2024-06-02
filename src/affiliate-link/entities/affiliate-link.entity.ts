import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Store } from 'src/store/entities/store.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class AffiliateLink extends AbstractEntity<AffiliateLink> {
  @Column()
  link: string;

  @Column({ nullable: true })
  merchant: string;

  @Column({ nullable: true })
  trackLink: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column()
  clicks: number;

  @OneToMany(() => Purchase, (purchase) => purchase.affiliateLink)
  purchases: Purchase[];

  @OneToOne(() => Store, (coupon) => coupon.affiliateLink)
  store: Store;
}
