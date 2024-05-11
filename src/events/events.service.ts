import { Injectable } from '@nestjs/common';
import { EventsRepository } from 'src/common/repositories';
import { EventDataType } from 'src/common/types';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(private readonly eventsRepository: EventsRepository) {}

    // ============================================ Create new event

    async createEvent(createEventDto: CreateEventDto, companyId: number): Promise<EventDataType> {
        const { employee, client, services } = createEventDto;

        const newEvent = {
            ...createEventDto,
            company: {
                id: companyId,
            },
            services: services.map(s => ({ id: s })),
            client: { id: client },
            employee: { id: employee },
        };

        return await this.eventsRepository.save(newEvent);
    }

    // ============================================ Get company events

    async getCompanyEvents(
        companyId: number,
        year: number,
        month: number
    ): Promise<EventDataType[]> {
        return await this.eventsRepository.find({
            where: {
                company: { id: companyId },
                year,
                month,
            },
            relations: ['employee', 'client', 'services'],
            select: {
                services: { id: true, name: true },
                employee: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    jobTitle: true,
                },
                client: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                },
            },
        });
    }
}
