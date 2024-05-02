import { Category } from 'src/category/entities/category.entity';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class SubCategory extends AbstractEntity<SubCategory> {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (cat) => cat.subcategories)
  category: Category;

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @OneToMany(() => Coupon, (coupon) => coupon.subCategory)
  coupons: Coupon[];

  @Column({
    type: Boolean,
    default: true,
  })
  status: boolean;
}
