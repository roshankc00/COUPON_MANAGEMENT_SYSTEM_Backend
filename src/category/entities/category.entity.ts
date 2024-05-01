import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  showInMenu: boolean;

  @Column()
  featured: boolean;

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @Column()
  status: boolean;
}
