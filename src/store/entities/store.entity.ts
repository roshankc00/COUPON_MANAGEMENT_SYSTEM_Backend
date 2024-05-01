import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Seo } from 'src/common/entity/Seo.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Store extends AbstractEntity<Store> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: Boolean,
    default: false,
  })
  featured: boolean;

  @OneToOne(() => Seo, { cascade: true })
  @JoinColumn()
  seo: Seo;

  @Column({
    type: Boolean,
    default: true,
  })
  status: boolean;
}
