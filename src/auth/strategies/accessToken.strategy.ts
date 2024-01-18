import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/common/repositories';
import { IBasicUserInfo } from 'src/users/users.types';

export interface IJwtPayload extends IBasicUserInfo {}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<IBasicUserInfo> {
    const token = req.get('Authorization').split(' ')[1];

    if (token) {
      const user = await this.usersRepository.getByAccessToken(token);

      if (!user || !user.id) throw new ForbiddenException();

      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
