import { AbstractEntity } from 'src/common/database/abstract.entity';
import { License } from 'src/ecommerce/license/entities/license.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class SubProduct extends AbstractEntity<SubProduct> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  productId: number;

  @Column()
  price: number;

  @OneToMany(() => License, (li) => li.subProduct)
  licenses: License[];

  @OneToMany(() => Order, (order) => order.subProduct)
  orders: Order[];

  @ManyToOne(() => Product, (pro) => pro.subProductItems)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
