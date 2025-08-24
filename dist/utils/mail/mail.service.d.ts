import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendOtp(email: string, text: string, otp: string): Promise<undefined>;
}
