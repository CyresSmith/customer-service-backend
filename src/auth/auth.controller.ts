import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { LocalGuard } from 'src/common/guards/local.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { MessageResponse } from 'src/common/types';
import { TokenService } from 'src/token/token.service';
import { ITokenPair } from 'src/token/token.types';
import { UsersService } from 'src/users/users.service';
import {
  IBasicUserInfo,
  IBasicUserInfoWithTokens,
} from 'src/users/users.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService
  ) {}

  // ============================================ Login user
  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<IBasicUserInfoWithTokens> {
    const tokenPair = await this.tokenService.generateNewTokenPair(user);
    await this.usersService.updateTokens(user.id, tokenPair);

    return { user, ...tokenPair };
  }

  // ============================================ Refresh user
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(200)
  async refresh(
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<ITokenPair> {
    const tokenPair = await this.tokenService.generateNewTokenPair(user);
    await this.usersService.updateTokens(user.id, tokenPair);

    return tokenPair;
  }

  // ============================================ Logout user
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(200)
  async logout(
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<MessageResponse> {
    return this.usersService.logout(user.id);
  }
}
