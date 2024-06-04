import { AbstractEntity } from 'src/common/database/abstract.entity';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { Product } from 'src/ecommerce/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order extends AbstractEntity<Order> {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: false })
  isPaid: boolean;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
    default: ORDER_STATUS_ENUM.pending,
  })
  status: string;
}
