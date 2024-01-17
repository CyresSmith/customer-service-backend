import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IBasicUserInfo } from 'src/users/users.types';
import { GenerateTokenDto, TokenType } from './dto/generate-token.dto';
import { ITokenPair } from './token.types';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // ============================================ Generate JWT token

  async generateToken({ type, payload }: GenerateTokenDto): Promise<string> {
    const secret = this.configService.get(
      type === TokenType.ACCESS ? 'JWT_ACCESS_SECRET' : 'JWT_REFRESH_SECRET'
    );
    const expiresIn = this.configService.get(
      type === TokenType.ACCESS
        ? 'JWT_ACCESS_EXPIRE_TIME'
        : 'JWT_REFRESH_EXPIRE_TIME'
    );

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  // ============================================ Generate new JWT token pair

  async generateNewTokenPair(payload: IBasicUserInfo): Promise<ITokenPair> {
    return {
      accessToken: await this.generateToken({
        type: TokenType.ACCESS,
        payload,
      }),
      refreshToken: await this.generateToken({
        type: TokenType.REFRESH,
        payload,
      }),
    };
  }

  // ============================================ Verify JWT token
  async verifyToken(type: TokenType, token: string) {
    const secret = this.configService.get(
      type === TokenType.ACCESS ? 'JWT_ACCESS_SECRET' : 'JWT_REFRESH_SECRET'
    );

    const response = await this.jwtService.verifyAsync(token, { secret });

    if (!response) {
      if (type === 1) throw new UnauthorizedException();
      if (type === 2) throw new ForbiddenException();
    }

    return response;
  }
}
