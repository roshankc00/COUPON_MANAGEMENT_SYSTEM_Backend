import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EmailService, ImailOptions } from '../common/email/email.service';
import { GenerateAnalytics, MonthData } from '../common/analytics/getAnalytics';
import * as crypto from 'crypto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ForgetPasswordDto } from './dto/forget.password.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly generateAnalytics: GenerateAnalytics<User>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}
  async create({ email, name, password }: CreateUserDto, req: Request) {
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
    const token = this.generateVerificationToken(email);
    await this.emailService.sendMail({
      subject: 'Email Verification',
      email,
      name,
      url: `${this.configService.getOrThrow('CLIENT_URL')}/login?token=${token}`,
      template: 'emailVerification.ejs',
    });
    return this.entityManager.save(user);
  }

  async verifyEmail(req: Request) {
    const token = req.params.token;
    const payload = jwt.verify(
      token,
      this.configService.getOrThrow('EMAIL_VERIFICATION_TOKEN'),
    ) as { email: string };

    if (payload?.email) {
      const user = await this.userRepository.findOne({
        where: { email: payload.email },
      });
      user.isVerified = true;
      return this.entityManager.save(user);
    }
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
    return this.entityManager.remove(user);
  }

  async validate(email: string, password: string) {
    const userexist = await this.userRepository.findOne({
      where: {
        email,
        isVerified: true,
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

  private generateVerificationToken(email: string) {
    const payload = {
      email,
    };
    return jwt.sign(
      payload,
      this.configService.getOrThrow('EMAIL_VERIFICATION_TOKEN'),
    );
  }

  async forgetPassword({ email }: ForgetPasswordDto, req: Request) {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (!userExists) {
      throw new BadRequestException('User with this email doesnt exists');
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    userExists.resetDateExpire = new Date(Date.now() + 10 * 60 * 1000);
    userExists.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    await this.emailService.sendMail({
      subject: 'Forget PasswordLink',
      email,
      name: userExists.name,
      url: `${this.configService.getOrThrow('CLIENT_URL')}/forget-password/${resetToken}`,
      template: 'forgetpassord.ejs',
    });
    return this.entityManager.save(userExists);
  }

  async resetPassword({ newPassword }: ResetPasswordDto, req: Request) {
    const token = req.params.token;
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken },
    });

    if (user && user.resetDateExpire && user.resetDateExpire > new Date()) {
      user.password = await bcrypt.hash(newPassword, 10);
      return this.entityManager.save(user);
    } else {
      throw new BadRequestException('Token expired');
    }
  }

  async changePassword({ email, newPassword, oldPassword }: ChangePasswordDto) {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (!userExists) {
      throw new BadRequestException('User with this email doesnt exists');
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      userExists.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    userExists.password = await bcrypt.hash(newPassword, 10);
    return this.entityManager.save(userExists);
  }
}
