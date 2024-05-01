import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TokenType } from 'src/token/dto/generate-token.dto';
import { TokenService } from 'src/token/token.service';
import { UsersRepository } from '../repositories';

@Injectable()
export class wsJwtGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private usersRepository: UsersRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const socket: Socket = context.switchToWs().getClient<Socket>();

            const accessToken: string = socket.handshake.headers?.authorization?.split(' ')[1];

            await this.tokenService.verifyToken(TokenType.ACCESS, accessToken);

            const user = await this.usersRepository.findOneBy({ accessToken });

            if (user) {
                context.switchToHttp().getRequest().user = user;
            }

            return Boolean(user);
        } catch (err) {
            throw new WsException(err.message);
        }
    }
}
