import { AbstractEntity } from 'src/common/database/abstract.entity';
import { PRODUCT_TYPE_ENUM } from 'src/common/enums/ecommerce.enum';
import { License } from 'src/ecommerce/license/entities/license.entity';
import { Order } from 'src/ecommerce/orders/entities/order.entity';
import { SubProduct } from 'src/ecommerce/sub-product/entities/sub-product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ select: false })
  bulbName: string;

  @Column()
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: PRODUCT_TYPE_ENUM,
  })
  product_type: string;

  @OneToMany(() => SubProduct, (sub) => sub.product)
  productItems: SubProduct[];
}
