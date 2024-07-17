import { AbstractEntity } from 'src/common/database/abstract.entity';
import { STATUS_ENUM } from 'src/common/enums/status.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class SubmitOffer extends AbstractEntity<SubmitOffer> {
  @Column({ nullable: true })
  code: string;

  @Column()
  url: string;

  @Column()
  tagLine: string;

  @Column()
  startDate: Date;

  @Column()
  expireDate: Date;

  @Column()
  isDeal: boolean;

  @ManyToOne(() => User, (user) => user.submitOffers)
  user: User;

  @Column({ select: false, nullable: true })
  bulbName: string;

  @Column({ nullable: true })
  imageUrl: string;
}
