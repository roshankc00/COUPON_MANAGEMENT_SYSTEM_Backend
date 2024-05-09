import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Seo } from '../../../src/common/entity/Seo.entity';
import { STATUS_ENUM } from '../../../src/common/enums/status.enum';
import { Coupon } from '../../../src/coupons/entities/coupon.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Store extends AbstractEntity<Store> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageName: string;

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

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;
}
