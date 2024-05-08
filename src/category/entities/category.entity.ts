import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { STATUS_ENUM } from 'src/common/enums/status.enum';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageName: string;

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;

  @Column()
  showInMenu: boolean;

  @Column()
  featured: boolean;

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @OneToMany(() => SubCategory, (sub) => sub.category, { eager: true })
  subcategories: SubCategory[];

  @OneToMany(() => Coupon, (cou) => cou.category)
  coupons: Coupon[];
}
