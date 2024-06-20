import { AbstractEntity } from 'src/common/database/abstract.entity';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { SubProduct } from 'src/ecommerce/sub-product/entities/sub-product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order extends AbstractEntity<Order> {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  subProductId: number;

  @ManyToOne(() => SubProduct, (sub) => sub.orders)
  @JoinColumn({ name: 'subProductId' })
  subProduct: SubProduct;

  @Column({ default: false })
  isPaid: boolean;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
    default: ORDER_STATUS_ENUM.pending,
  })
  status: string;
}
