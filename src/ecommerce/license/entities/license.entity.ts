import { InjectRepository } from '@nestjs/typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { SubProduct } from 'src/ecommerce/sub-product/entities/sub-product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class License extends AbstractEntity<License> {
  @Column()
  title: string;

  @Column({ nullable: true })
  expireDate: Date;

  @Column({ nullable: true })
  validityDays: number;

  @Column()
  subProductId: number;

  @Column()
  code: string;

  @Column({ default: false })
  assigned: boolean;

  @ManyToOne(() => User, (user) => user.licenses)
  user: User;

  @ManyToOne(() => SubProduct, (pro) => pro.licenses)
  @JoinColumn({ name: 'subProductId' })
  subProduct: SubProduct;
}
