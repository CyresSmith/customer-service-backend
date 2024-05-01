import { Injectable } from '@nestjs/common';
import { Channel, User } from 'db/entities';
import { ChannelsRepository } from 'src/common/repositories';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

import { ChannelData, MessageResponse } from 'src/common/types';

@Injectable()
export class ChannelsService {
    constructor(private readonly channelsRepository: ChannelsRepository) {}

    async create(createChannelDto: CreateChannelDto): Promise<Channel> {
        const { name, users, company: id } = createChannelDto;

        if (name) {
            await this.channelsRepository.checkIsExist(name);
        }

        const newChannel = this.channelsRepository.create({
            ...createChannelDto,
            users: users.map(id => ({ id })),
            company: { id },
        });

        return await this.channelsRepository.save(newChannel);
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

    async getUserChannels(userId: number): Promise<ChannelData[]> {
        return await this.channelsRepository.getUserChannels(userId);
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
