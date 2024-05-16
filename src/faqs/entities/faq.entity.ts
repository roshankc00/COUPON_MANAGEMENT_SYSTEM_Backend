import { AbstractEntity } from '../../../src/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Faq extends AbstractEntity<Faq> {
  @Column()
  question: string;

  @Column()
  answer: string;
}
