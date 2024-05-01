import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { IBasicUserInfo } from 'src/users/users.types';

export interface AuthSocket extends Socket {
    user: IBasicUserInfo;
}

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;

export const WSAuthMiddleware = (
    jwtService: JwtService,
    usersService: UsersService,
    configService: ConfigService
): SocketMiddleware => {
    return async (socket: AuthSocket, next) => {
        try {
            const token = socket.handshake.headers?.authorization?.split(' ')[1];
            const secret = configService.get('JWT_ACCESS_SECRET');
            const response = await jwtService.verifyAsync(token, { secret });
            const userResult = await usersService.findOne(response.id);

            if (userResult) {
                socket.user = userResult;
                next();
            } else {
                next(new UnauthorizedException());
            }
        } catch (error) {
            next(new UnauthorizedException());
        }
    };
};
