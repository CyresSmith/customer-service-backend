import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
            relations: ['employees', 'employees.company'],
            where: {
                email,
            },
        });

        if (!user || !user.password) {
            throw new NotFoundException('Користувач не знайден');
        }

        if (!user.verify) {
            throw new BadRequestException('Будь ласка підтвердіть реєстрацію на пошті!');
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
            verify: user.verify,
            avatar: user.avatar,
        };
    }
}
