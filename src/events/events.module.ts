import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsRepository } from 'src/common/repositories';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from 'db/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventsController],
    providers: [EventsService, EventsRepository],
    exports: [EventsService],
})
export class EventsModule {}
