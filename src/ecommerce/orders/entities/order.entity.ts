import { AbstractEntity } from 'src/common/database/abstract.entity';
import { ORDER_STATUS_ENUM } from 'src/common/enums/ecommerce.enum';
import { License } from 'src/ecommerce/license/entities/license.entity';
import { SubProduct } from 'src/ecommerce/sub-product/entities/sub-product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

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

  @Column('jsonb', { nullable: true })
  orderDetails: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
    default: ORDER_STATUS_ENUM.pending,
  })
  status: string;

  @Column({ nullable: true })
  transectionId: string;

  @OneToOne(() => License)
  @JoinColumn()
  license: License;
}
