import { AbstractEntity } from 'src/common/database/abstract.entity';
import { PRODUCT_TYPE_ENUM } from 'src/common/enums/ecommerce.enum';
import { License } from 'src/ecommerce/license/entities/license.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: PRODUCT_TYPE_ENUM,
  })
  product_type: string;

  @Column()
  price: number;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => License, (license) => license.product)
  licenses: License[];
}
