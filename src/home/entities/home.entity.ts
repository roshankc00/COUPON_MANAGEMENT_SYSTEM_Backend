import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { HomeItem } from './homepage.item.entity';

@Entity()
export class Home extends AbstractEntity<Home> {
  @OneToMany(() => HomeItem, (item) => item.home, { cascade: true })
  homeItem: HomeItem[];
}
