import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NodeMailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class EmailService {
  private readonly transporter: any;
  private readonly host: string;
  private readonly port: string;
  private readonly user: string;
  private readonly pass: string;

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.get('email.host');
    this.port = this.configService.get('email.port');
    this.user = this.configService.get('email.user');
    this.pass = this.configService.get('email.pass');

    this.transporter = NodeMailer.createTransport({
      host: this.host,
      port: this.port,
      secure: true,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  // ============================================ Send Email

  async sendEmail(data: SendMailDto) {
    try {
      return await this.transporter.sendMail({ ...data, from: this.user });
    } catch (error) {
      throw new MethodNotAllowedException(error);
    }
  }
}
