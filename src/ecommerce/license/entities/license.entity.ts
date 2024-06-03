import { InjectRepository } from '@nestjs/typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { Subscription } from 'src/ecommerce/subscription/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class License extends AbstractEntity<License> {
  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.licenses)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  code: string;

  @OneToMany(() => Subscription, (sub) => sub.license)
  subscribers: Subscription[];
}
