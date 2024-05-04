import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  GenerateAnalytics,
  MonthData,
} from '../common/analytics/last-12-month';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<User>,
  ) {}
  async create({ email, name, password }: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      throw new BadRequestException('User with this email already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    return this.entityManager.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User with this id doesnt exist');
    }
    return user;
  }

  findAll() {
    return this.userRepository.find({});
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User with this id doesnt exist');
    }
    user.isActive = false;
    return this.entityManager.save(user);
  }

  async validate(email: string, password: string) {
    const userexist = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
        role: true,
        name: true,
        isActive: true,
        phoneNumber: true,
      },
    });
    if (!userexist) {
      throw new BadRequestException('User with this email doesnt exists');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userexist.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid creadentials');
    }

    return {
      id: userexist.id,
      name: userexist.name,
      role: userexist.role,
      isActive: userexist.isActive,
      phoneNumber: userexist.phoneNumber,
    };
  }

  async getUserAnalytics(): Promise<{
    last12Months: MonthData[];
  }> {
    return await this.generateAnalytics.getLast12MonthData(this.userRepository);
  }

  async countUsers() {
    return this.userRepository.count();
  }
}
