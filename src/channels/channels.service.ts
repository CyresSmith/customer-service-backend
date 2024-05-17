import { Injectable } from '@nestjs/common';
import { Channel, User } from 'db/entities';
import { take } from 'src/common/constants';
import { ChannelsRepository, MessagesRepository } from 'src/common/repositories';
import { MessageResponse } from 'src/common/types';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsService {
    constructor(
        private readonly channelsRepository: ChannelsRepository,
        private readonly messagesRepository: MessagesRepository
    ) {}

    async create(createChannelDto: CreateChannelDto): Promise<
        Omit<Channel, 'users'> & {
            users: number[];
        }
    > {
        const { name, users, company: id } = createChannelDto;

        if (name) {
            await this.channelsRepository.checkIsExist(name);
        }

        const newChannel = this.channelsRepository.create({
            ...createChannelDto,
            users: users.map(id => ({ id })),
            company: { id },
        });

        const channel = await this.channelsRepository.save(newChannel);

        return { ...channel, users: channel.users.map(({ id }) => id) };
    }

    findAll() {
        return `This action returns all channels`;
    }

    findOne(id: number) {
        return `This action returns a #${id} channel`;
    }

    update(id: number, updateChannelDto: UpdateChannelDto) {
        return `This action updates a #${id} channel`;
    }

    async getUserChannels(userId: number) {
        const channels = await this.channelsRepository.getUserChannels(userId);

        if (channels.length > 0) {
            const promises = channels.map(async ({ id }) => {
                const channel = await this.channelsRepository.findOne({
                    where: { id },
                    relations: ['users'],
                    select: {
                        users: { id: true },
                    },
                });

                const messages = await this.messagesRepository.find({
                    where: {
                        channel: { id },
                    },
                    relations: ['from', 'channel'],
                    select: {
                        content: true,
                        createdAt: true,
                        id: true,
                        from: { id: true },
                        channel: { id: true },
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                    take,
                });

                return {
                    ...channel,
                    users: channel.users.map(({ id }) => id),
                    messages,
                };
            });

            return await Promise.all(promises);
        }

        return [];
    }

    async addUsers(id: number, companyId: number, users: number[]): Promise<MessageResponse> {
        const channel = await this.channelsRepository.findOne({
            where: { id, company: { id: companyId } },
        });

        channel.users = [...channel.users, ...(users.map(id => ({ id })) as User[])];

        this.channelsRepository.save(channel);

        return { message: 'Канал оновлено' };
    }

    remove(id: number) {
        return `This action removes a #${id} channel`;
    }
}
