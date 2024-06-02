import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Store } from '../../../src/store/entities/store.entity';
import { User } from '../../../src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Follower extends AbstractEntity<Follower> {
  @Column()
  userId: number;

  @Column()
  storeId: number;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Store, (sto) => sto.followers)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
