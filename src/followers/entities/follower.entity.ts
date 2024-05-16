import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Store } from '../../../src/store/entities/store.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne, W } from 'typeorm';

@Entity()
export class Follower extends AbstractEntity<Follower> {
  @OneToOne(() => User, (user) => user.follower)
  @JoinColumn()
  user: User;

  @OneToMany(() => Store, (sto) => sto.follower)
  stores: Store[];
}
