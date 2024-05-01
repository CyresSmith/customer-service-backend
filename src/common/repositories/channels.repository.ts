import { BadRequestException, Injectable } from '@nestjs/common';
import { Channel } from 'db/entities';
import { DataSource, Repository } from 'typeorm';
import { ChannelData } from '../types';

@Injectable()
export class ChannelsRepository extends Repository<Channel> {
    constructor(private readonly ds: DataSource) {
        super(Channel, ds.createEntityManager());
    }

    async checkIsExist(name: string): Promise<boolean> {
        const isExist = await this.findOneBy({ name });

        if (isExist) {
            throw new BadRequestException(`Channel with name "${name}" is already exist`);
        }

        return false;
    }

    getById(id: number): Promise<Channel> {
        return this.findOne({
            where: {
                id,
            },
        });
    }

    async getUserChannels(userId: number): Promise<ChannelData[]> {
        const channels = await this.find({
            relations: ['users', 'messages', 'messages.from'],
            select: {
                users: { id: true },
                messages: { content: true, createdAt: true, id: true, from: { id: true } },
            },
        });

        return channels
            .map(channel => ({
                ...channel,
                users: channel.users.map(({ id }) => id),
            }))
            .filter(({ users }) => users.includes(userId));
    }
}
