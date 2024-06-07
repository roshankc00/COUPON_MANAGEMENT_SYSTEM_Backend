import { InjectRepository } from '@nestjs/typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class License extends AbstractEntity<License> {
  @Column()
  title: string;

  @Column()
  expireDate: Date;

  @Column()
  validityDays: number;

  @Column()
  productId: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  assigned: boolean;

  @ManyToOne(() => User, (user) => user.licenses)
  user: User;

  @ManyToOne(() => Product, (pro) => pro.licenses)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
