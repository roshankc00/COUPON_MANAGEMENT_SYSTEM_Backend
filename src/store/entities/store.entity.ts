import { Follower } from 'src/followers/entities/follower.entity';
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

  @ManyToOne(() => Follower, (follow) => follow.stores)
  follower: Store;

  @Column({
    type: 'enum',
    enum: STATUS_ENUM,
  })
  status: STATUS_ENUM;
}

// id 2 --> foods
// id 5 --> Beauty
// id 8 --> software
// id 6 --> Accessories
// id 4 --> Clothes
// id 3 --> electronics


// Bags
// Belts
// Briefcase
// Cufflinks
// Designer Accessories
// Eyewear
// Gloves


// Academic Software
// Business Software
// Device Drivers
// Media Software
// Microsoft
// Mobile Software