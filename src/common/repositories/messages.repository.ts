import { Injectable } from '@nestjs/common';
import { Message } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessagesRepository extends Repository<Message> {
    constructor(private readonly ds: DataSource) {
        super(Message, ds.createEntityManager());
    }

    getById(id: number): Promise<Message> {
        return this.findOne({
            where: {
                id,
            },
        });
    }
}
