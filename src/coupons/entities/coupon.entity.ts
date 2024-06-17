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

@Entity()
export class Coupon extends AbstractEntity<Coupon> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tagLine: string;

  @Column({ nullable: true })
  code: string;

  @Column()
  startDate: Date;

  @Column()
  expireDate: Date;

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

  @Column({ select: false })
  bulbName: string;

  @Column()
  imageUrl: string;

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

  @OneToMany(() => Wishlist, (wish) => wish.coupon)
  wishlists: Wishlist[];

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @OneToMany(() => Review, (rev) => rev.coupon)
  reviews: Review[];

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;

  @Column()
  isDeal: boolean;
}
