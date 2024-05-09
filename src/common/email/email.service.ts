import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type ImailOptions = {
  subject: string;
  email: string;
  name: string;
  url: string;
  template: string;
};

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
}
