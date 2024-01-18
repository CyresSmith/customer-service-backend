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
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { MessageResponse } from 'src/common/types';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { SendVerifyCodeDto } from './dto/send-veryfi-code.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UsersService } from './users.service';
import { IBasicUserInfo, IBasicUserInfoWithTokens } from './users.types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  // ============================================ Register user

  @Post('register')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<MessageResponse> {
    return await this.usersService.create(createUserDto);
  }

  // ============================================ Verify user

  @Post('verify')
  @HttpCode(200)
  async verify(@Body() body: VerifyUserDto): Promise<IBasicUserInfoWithTokens> {
    const user = await this.usersService.verify(body.code);
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
    @Request() req: { user: IBasicUserInfo }
  ): Promise<IBasicUserInfo> {
    return await this.usersService.getBaseInfo(req.user.id);
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

  // ============================================

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
