import { BadRequestException, Injectable } from '@nestjs/common';
import { Channel } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

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

    async getUserChannels(userId: number): Promise<Partial<Channel>[]> {
        return await this.find({
            where: { users: { id: userId } },
            select: ['id'],
        });
    }
}
