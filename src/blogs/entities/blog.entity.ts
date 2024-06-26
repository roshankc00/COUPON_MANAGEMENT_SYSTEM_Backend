import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { BlogItem } from './blog-item.entity';

@Entity()
export class Blog extends AbstractEntity<Blog> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @OneToMany(() => BlogItem, (blogItem) => blogItem.blog)
  blogItems: BlogItem[]; // Ensure the correct relation name
}
