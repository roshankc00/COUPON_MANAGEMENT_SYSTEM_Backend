import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { USER_ROLE_ENUM } from '../enums/user.role.enum';
import dataSource from 'typeorm.config';
import { EntityManager } from 'typeorm';

const AdminSeeder = async () => {
  const connection = await dataSource.connect();
  const entityManager: EntityManager = connection.manager;
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = new User({
    email: 'admin@admin.com',
    password: hashedPassword,
    role: USER_ROLE_ENUM.ADMIN,
    name: 'admin',
    isVerified: true,
  });
  await entityManager.save(user);
};

AdminSeeder();
