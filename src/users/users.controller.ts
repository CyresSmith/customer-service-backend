import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Company } from 'db/entities';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CompaniesRepository } from 'src/common/repositories';
import { ICreateUserResponse, MessageResponse } from 'src/common/types';
import { TokenService } from 'src/token/token.service';
import { DeepPartial } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { SendVerifyCodeDto } from './dto/send-verify-code.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IBasicUserInfo, IBasicUserInfoWithTokens } from './users.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly companiesRepository: CompaniesRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ============================================ Register user

  @Post('register')
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ICreateUserResponse> {
    return await this.usersService.create(createUserDto);
  }

  // ============================================ Verify user

  @Get('verify/:token')
  @HttpCode(200)
  async verifyUser(
    @Param('token') token: string
  ): Promise<IBasicUserInfoWithTokens> {
    const user = await this.usersService.verify(token);
    const tokenPair = await this.tokenService.generateNewTokenPair(user);
    await this.usersService.updateTokens(user.id, tokenPair);
    return { user, ...tokenPair };
  }

  // ============================================ Send verify code

  @Post('send-verify-code')
  @HttpCode(200)
  async sendVerifyCode(
    @Body() body: SendVerifyCodeDto
  ): Promise<MessageResponse> {
    return await this.usersService.sendVerify(body.email);
  }

  // ============================================ Current user

  @UseGuards(AccessTokenGuard)
  @Get('current')
  @HttpCode(200)
  async getUserInfo(
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<{ user: IBasicUserInfo; companies: DeepPartial<Company>[] }> {
    const userData = await this.usersService.getBaseInfo(user.id);
    const companies = await this.companiesRepository.find({
      where: {
        employees: { user: { id: user.id } },
      },
      select: ['name', 'id'],
    });

    return { user: userData, companies };
  }

  // ============================================ Password restore email

  @Post('/password-restore-email')
  @HttpCode(200)
  async sendResetLink(
    @Body() body: SendVerifyCodeDto
  ): Promise<MessageResponse> {
    return await this.usersService.sendResetLink(body.email);
  }

  // ============================================ Restore password

  @Post('/restore-password')
  @HttpCode(200)
  async restorePassword(
    @Body() body: RestorePasswordDto
  ): Promise<MessageResponse> {
    return await this.usersService.restorePassword(body);
  }

  // ============================================ Update user

  @UseGuards(AccessTokenGuard)
  @Patch('/update/:id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // ============================================ Upload avatar

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/update/:id/avatar')
  async updateAvatar(
    @Param('id') id: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `user_${id}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.usersService.uploadAvatar(id, {
      avatar: url,
    });

    return { url };
  }

  // ============================================ Update password

  @UseGuards(AccessTokenGuard)
  @Patch('/update-password/:id')
  @HttpCode(200)
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePassDto: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(+id, updatePassDto);
  }

  // ============================================

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
