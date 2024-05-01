import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Seo extends AbstractEntity<Seo> {
  @Column()
  title: string;

  @Column()
  description: string;
}
