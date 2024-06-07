import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type ImailOptions = {
  subject: string;
  email: string;
  name: string;
  url: string;
  template: string;
};

export type IStoremailOptions = {
  subject: string;
  email: string;
  userName: string;
  url: string;
  template: string;
  storeName: string;
};

export interface IOrderSucess {
  subject: string;
  email: string;
  userName: string;
  template: string;
}

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendMail({ subject, email, name, url, template }: ImailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        url,
      },
    });
  }

  async notifyUserFavStoreUpdate({
    email,
    storeName,
    subject,
    userName,
    url,
    template,
  }: IStoremailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        userName,
        storeName,
        url,
      },
    });
  }

  async orderVerifiedMail({
    email,
    subject,
    userName,
    template,
  }: IOrderSucess) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        userName,
      },
    });
  }
}
