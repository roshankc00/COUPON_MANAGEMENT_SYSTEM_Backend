import { Blog } from 'src/blogs/entities/blog.entity';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class BlogItem extends AbstractEntity<BlogItem> {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageName: string;

  @ManyToOne(() => Blog, (blog) => blog.blogItem)
  blog: Blog;
}
