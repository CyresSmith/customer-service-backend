import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersRepository } from 'src/common/repositories';
import { IBasicUserInfo } from 'src/users/users.types';
import { promisify } from 'util';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // ============================================ Validate user

  async validateUser({ email, password }: LoginDto): Promise<IBasicUserInfo> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user || !user.password) {
      throw new ForbiddenException('User not found');
    }

    if (!user.verify) {
      throw new ForbiddenException('Please confirm Your registration');
    }

    if (!(await promisify(compare)(password, user.password))) {
      throw new ForbiddenException('Email or password is wrong');
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
