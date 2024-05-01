import { AbstractEntity } from 'src/common/database/abstract.entity';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: USER_ROLE_ENUM,
    default: ['USER'],
  })
  role: USER_ROLE_ENUM[];
}
