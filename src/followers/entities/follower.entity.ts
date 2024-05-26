import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Store } from '../../../src/store/entities/store.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, W } from 'typeorm';

@Entity()
export class Follower extends AbstractEntity<Follower> {
  @ManyToOne(() => User, (user) => user.followers)
  user: User;

  @OneToMany(() => Store, (store) => store.follower)
  stores: Store[];
}
