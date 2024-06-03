import { AbstractEntity } from 'src/common/database/abstract.entity';
import { License } from 'src/ecommerce/license/entities/license.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Subscription extends AbstractEntity<Subscription> {
  @Column()
  licenseId: number;

  @ManyToOne(() => User, (user) => user.subscribes)
  user: User;

  @Column()
  orderId: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => License, (li) => li.subscribers)
  @JoinColumn({ name: 'licenseId' })
  license: License;
}
