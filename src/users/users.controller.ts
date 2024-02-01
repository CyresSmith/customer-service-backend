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
  UseGuards,
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

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly companiesRepository: CompaniesRepository
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
