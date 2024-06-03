import { User } from 'src/users/entities/user.entity';

export class CreateSubscriptionDto {
  licenseId: number;
  orderId: number;
  user: User;
}
