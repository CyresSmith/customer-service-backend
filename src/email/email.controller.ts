import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    // ============================================ Send email

    @Post('/')
    @HttpCode(200)
    async sendEmail(@Body() body: SendMailDto) {
        await this.emailService.sendEmail(body);
    }
}
