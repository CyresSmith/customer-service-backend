import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChannelsService } from 'src/channels/channels.service';
import { CreateChannelDto } from 'src/channels/dto/create-channel.dto';
import { AuthSocket, WSAuthMiddleware } from 'src/common/middleware/auth.middlewars';
import { UsersRepository } from 'src/common/repositories';
import { channelRoom, userRoom } from 'src/common/utils';
import { MessagesService } from 'src/messages/messages.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
    cors: {
        origin: [process.env.FRONTEND_URL],
        allowedHeaders: ['authorization'],
        credentials: true,
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        // skipMiddlewares: true,
    },
    path: '/socket-gate',
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly channelsService: ChannelsService,
        private readonly messagesService: MessagesService,
        private readonly tokenService: TokenService,
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        server.use(WSAuthMiddleware(this.jwtService, this.usersService, this.configService));
    }

    @SubscribeMessage('user:online')
    async userOnline(@ConnectedSocket() socket: AuthSocket) {
        const { user } = socket;

        await this.usersRepository.update({ id: user.id }, { isOnline: true });

        socket.broadcast.emit('user:hello', {
            name: user.firstName + ' ' + user.lastName,
            id: user.id,
        });
    }

    // @SubscribeMessage('user:offline')
    // async userBye(@ConnectedSocket() socket: AuthSocket) {
    //     const { user } = socket;

    //     await this.usersRepository.update({ id: user.id }, { isOnline: false });

    //     socket.broadcast.emit('user:bye', {
    //         name: user.firstName + ' ' + user.lastName,
    //         id: user.id,
    //     });
    // }

    @SubscribeMessage('channel:list')
    async listChannels(@ConnectedSocket() socket: AuthSocket) {
        const { user } = socket;

        const channels = await this.channelsService.getUserChannels(user.id);

        const onlineUsers = await this.usersRepository.find({
            where: { isOnline: true },
            select: ['id'],
        });

        // const channel = await this.channelsService.find(data);

        // socket.to(userRoom(user.id)).emit('channel:created', channel);

        // socket.emit('client', data);

        return { channels, onlineUsers: onlineUsers.map(({ id }) => id) };
    }

    @SubscribeMessage('channel:create')
    async createChannel(
        @MessageBody() data: CreateChannelDto,
        @ConnectedSocket() socket: AuthSocket
    ) {
        const { user } = socket;
        const { users } = data;

        const channel = await this.channelsService.create({
            ...data,
            users: [...users, user.id],
        });

        const newChannel = { ...channel, messages: [] };

        channel.users.forEach(id => {
            this.server.in(userRoom(id)).socketsJoin(`channel:${channel.id}`);

            if (id !== user.id) {
                socket.to(userRoom(id)).emit('channel:created', newChannel);
            }
        });

        return newChannel;
    }

    @SubscribeMessage('channel:messages')
    async getChannelMessages(@MessageBody() data: { id: number; fromDate: string; take: number }) {
        return await this.messagesService.getChannelMessages(data);
    }

    @SubscribeMessage('message:typing')
    async onMessageTyping(@MessageBody() channelId: number, @ConnectedSocket() socket: AuthSocket) {
        const { user } = socket;

        socket.broadcast.to(channelRoom(channelId)).emit('user:startTyping', user.id);
    }

    @SubscribeMessage('message:stopTyping')
    async onMessageStopTyping(
        @MessageBody() channelId: number,
        @ConnectedSocket() socket: AuthSocket
    ) {
        const { user } = socket;

        socket.broadcast.to(channelRoom(channelId)).emit('user:stopTyping', user.id);
    }

    @SubscribeMessage('message:send')
    async addMessage(
        @MessageBody() data: { content: string; channelId: number },
        @ConnectedSocket() socket: AuthSocket
    ) {
        const { user } = socket;
        const message = await this.messagesService.create({ ...data, from: user.id });

        socket.to(channelRoom(message.channel.id)).emit('message:sent', message);

        return message;
    }

    async initEventHandlers(client: Socket) {
        const accessToken: string = client.handshake.headers?.authorization?.split(' ')[1];

        if (accessToken) {
            const user = await this.usersRepository.findOne({
                where: { accessToken },
                relations: ['channels'],
            });

            if (!user) {
                throw new WsException('User not found');
            }

            if (user.channels.length > 0) {
                user.channels.forEach(({ id }) => {
                    client.join(channelRoom(id));
                });
            }

            client.join(userRoom(user.id));
        }
    }

    async disconnectHandlers(client: AuthSocket) {
        const user = await this.usersRepository.findOne({
            where: { id: client.user.id },
            relations: ['channels'],
        });

        if (user.channels.length > 0) {
            user.channels.forEach(({ id }) => {
                client.leave(channelRoom(id));
            });
        }

        client.leave(userRoom(user.id));

        await this.usersRepository.update({ id: client.user.id }, { isOnline: false });

        client.broadcast.emit('user:bye', {
            name: user.firstName + ' ' + user.lastName,
            id: client.user.id,
        });

        console.log(`socket ${client.id} disconnected`);
    }

    handleConnection(socket: Socket) {
        this.initEventHandlers(socket);
    }

    async handleDisconnect(socket: AuthSocket) {
        this.disconnectHandlers(socket);
    }
}
