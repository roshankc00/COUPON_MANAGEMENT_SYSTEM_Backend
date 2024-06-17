import { Column, Entity, ManyToOne } from 'typeorm';
import { Blog } from './blog.entity';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Entity()
export class BlogItem extends AbstractEntity<BlogItem> {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ select: false, nullable: true })
  bulbName: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Blog, (blog) => blog.blogItems)
  blog: Blog; // Ensure the correct relation name
}
