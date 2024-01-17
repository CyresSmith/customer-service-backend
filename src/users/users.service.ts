import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersRepository } from 'src/common/repositories';
import { MessageResponse } from 'src/common/types';
import { EmailService } from 'src/email/email.service';
import { ITokenPair } from 'src/token/token.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IBasicUserInfo } from './users.types';

const verificationEmail = (
  verificationCode: string
) => `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 30px;">
                <table style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">        
                  <tr>
                      <td style="text-align: center; padding: 20px 0;">
                          <h2>Email Verification</h2>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 0 30px;">
                          <p>Thank you for signing up with Customer Service. To complete your registration, please enter verification code</p>
                      </td>
                  </tr>
                  <tr>
                      <td style="text-align: center; padding: 20px;">
                          <span" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; border-radius: 20px; font-size: 20px">${verificationCode}</span>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 0 30px;">
                          <p>If you didn't sign up for Customer Service, you can safely ignore this email.</p>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 0 30px;">
                          <p>Best regards,</p>
                          <p>The Customer Service Team</p>
                      </td>
                  </tr>
                </table>
            </div>`;

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private emailService: EmailService
  ) {}

  // ============================================ Create user

  async create(createUserDto: CreateUserDto): Promise<MessageResponse> {
    await this.usersRepository.isExistCheck(
      createUserDto.email,
      createUserDto.phone
    );

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      verificationCode,
    });

    await this.emailService.sendEmail({
      to: createUserDto.email,
      subject: 'Verify email',
      html: verificationEmail(verificationCode),
    });

    await this.usersRepository.save(newUser);

    return {
      message:
        'Verification code send on Your email, please confirm registration!',
    };
  }

  // ============================================ Verify user

  async verify(verificationCode: string): Promise<IBasicUserInfo> {
    const user = await this.usersRepository.findOne({
      where: { verificationCode },
      select: ['id', 'email', 'phone', 'firstName', 'lastName'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.usersRepository.update(user.id, {
      verify: true,
      verificationCode: '',
    });

    return { ...user };
  }

  // ============================================ Send verification code

  async sendVerify(email: string): Promise<MessageResponse> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'phone',
        'firstName',
        'lastName',
        'verify',
        'verificationCode',
      ],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.verify && !user.verificationCode) {
      throw new BadRequestException('User verification is complete');
    } else {
      const verificationCode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();

      await this.usersRepository.update(user.id, {
        verificationCode,
      });

      await this.emailService.sendEmail({
        to: email,
        subject: 'Verify email',
        html: verificationEmail(verificationCode),
      });

      return { message: 'Verification email sent' };
    }
  }

  // ============================================ Update user tokens

  async updateTokens(userId: number, tokens: ITokenPair) {
    await this.usersRepository.update(userId, tokens);
  }

  // ============================================ Get base user info

  async getBaseInfo(userId: number): Promise<IBasicUserInfo> {
    return await this.usersRepository.getById(userId);
  }

  // ============================================Logout user

  async logout(id: number): Promise<MessageResponse> {
    await this.usersRepository.update(id, {
      accessToken: '',
      refreshToken: '',
    });

    return { message: 'Successfully logout' };
  }

  // ============================================

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.usersRepository.getById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
