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
  name: string;

  @Column()
  email: string;

  @Column()
  code: string;

  @ManyToOne(() => User, (user) => user.licenses)
  user: User;
}
