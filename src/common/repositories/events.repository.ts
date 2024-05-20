import { Injectable } from '@nestjs/common';
import { Event } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EventsRepository extends Repository<Event> {
    constructor(private readonly ds: DataSource) {
        super(Event, ds.createEntityManager());
    }
}
