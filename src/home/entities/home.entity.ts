import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Home extends AbstractEntity<Home> {
  @Column('text', { array: true })
  sliderImages: string[];
}
