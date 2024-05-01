import { Module } from '@nestjs/common';
import { ChannelsModule } from 'src/channels/channels.module';
import { ChannelsService } from 'src/channels/channels.service';
import { ChannelsRepository, MessagesRepository, UsersRepository } from 'src/common/repositories';
import { MessagesService } from 'src/messages/messages.service';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { SocketService } from './socket.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TokenModule, UsersModule, ChannelsModule],
    controllers: [],
    providers: [
        SocketService,
        ChannelsService,
        ChannelsRepository,
        MessagesService,
        MessagesRepository,
        UsersRepository,
        JwtService,
    ],
    exports: [SocketService],
})
export class SocketModule {}
