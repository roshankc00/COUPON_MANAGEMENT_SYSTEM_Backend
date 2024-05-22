import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Feedback extends AbstractEntity<Feedback> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column()
  message: string;
}
