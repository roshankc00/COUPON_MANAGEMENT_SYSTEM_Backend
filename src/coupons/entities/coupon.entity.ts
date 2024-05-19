import { Wishlist } from '../../../src/wishlists/entities/wishlist.entity';
import { Category } from '../../../src/category/entities/category.entity';
import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Seo } from '../../../src/common/entity/Seo.entity';
import { STATUS_ENUM } from '../../../src/common/enums/status.enum';
import { Store } from '../../../src/store/entities/store.entity';
import { SubCategory } from '../../../src/sub-categories/entities/sub-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Review } from 'src/review/entities/review.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Cashback } from 'src/cashback/entities/cashback.entity';
import { AffiliateLink } from 'src/affiliate-link/entities/affiliate-link.entity';

@Entity()
export class Coupon extends AbstractEntity<Coupon> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tagLine: string;

  @Column()
  code: string;

  @Column()
  startDate: Date;

  @Column()
  expireDate: Date;

  @Column()
  url: string;

  @Column({
    type: Boolean,
    default: false,
  })
  featured: boolean;

  @Column()
  categoryId: number;

  @Column()
  subCategoryId: number;

  @Column()
  storeId: number;

  @Column()
  imageName: string;

  @Column({
    type: Boolean,
    default: false,
  })
  verified: boolean;

  @Column({
    type: Boolean,
    default: false,
  })
  exclusive: boolean;

  @ManyToOne(() => Category, (cat) => cat.coupons)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => SubCategory, (subcat) => subcat.coupons)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @ManyToOne(() => Store, (store) => store.coupons)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @ManyToOne(() => Wishlist, (wish) => wish.coupons)
  wishlist: Wishlist;

  @OneToMany(() => Review, (rev) => rev.coupon)
  reviews: Review[];

  @OneToMany(() => Feedback, (fed) => fed.coupon)
  feedbacks: Feedback[];

  @OneToMany(() => Feedback, (pur) => pur.coupon)
  purchases: Purchase[];

  @ManyToOne(() => AffiliateLink, (affiliateLink) => affiliateLink.coupons)
  affiliateLink: AffiliateLink;

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;
}
