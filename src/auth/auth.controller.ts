import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/token/token.service';
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
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<IBasicUserInfoWithTokens> {
    const tokenPair = await this.tokenService.generateNewTokenPair(user);
    await this.usersService.updateUserTokens(user.id, tokenPair);

    return { ...user, ...tokenPair };
  }

  // ============================================ Refresh user
  @UseGuards(AuthGuard('refresh'))
  @HttpCode(200)
  @Get('refresh')
  async refresh(@Request() req: { user: IBasicUserInfo }) {
    return this.tokenService.generateNewTokenPair(req.user);
  }
}
