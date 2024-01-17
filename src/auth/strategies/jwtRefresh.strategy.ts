import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'db/entities';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/common/repositories';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload): Promise<Partial<User>> {
    const user = await this.usersRepository.getUserById(payload?.id);

    if (!user?.id) throw new ForbiddenException();

    return user;
  }
}
