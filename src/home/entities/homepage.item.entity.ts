import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Home } from './home.entity';

@Entity()
export class HomeItem extends AbstractEntity<HomeItem> {
  @Column({ select: false })
  bulbName: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Home, (home) => home.homeItem)
  home: Home;
}
