import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'db/entities';
import { EventsRepository, ServicesRepository } from 'src/common/repositories';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventsController],
    providers: [EventsService, EventsRepository, ServicesRepository],
    exports: [EventsService],
})
export class EventsModule {}
