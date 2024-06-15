import { Injectable } from '@nestjs/common';
import { Company } from 'db/entities';
import { EventsRepository, ServicesRepository } from 'src/common/repositories';
import { EventDataType } from 'src/common/types';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(
        private readonly eventsRepository: EventsRepository,
        private readonly servicesRepository: ServicesRepository
    ) {}

    // ============================================ Create new event

    async createEvent(createEventDto: CreateEventDto, companyId: number): Promise<EventDataType> {
        const { employee, client, services } = createEventDto;

        const getAmount = async () => {
            let total = 0;

            for (const id of services) {
                const price = await this.servicesRepository.getPrice(id);
                total += price;
            }

            return total;
        };

        const newEvent = {
            ...createEventDto,
            company: {
                id: companyId,
            },
            services: services.map(id => ({ id })),
            client: { id: client },
            employee: { id: employee },
            amount: await getAmount(),
        };

        return await this.eventsRepository.save(newEvent);
    }

    // ============================================ Get company events

    async getCompanyEvents(where: {
        company: Company;
        year: number;
        month: number;
        day?: number;
    }): Promise<EventDataType[]> {
        return await this.eventsRepository.find({
            where,
            relations: ['employee', 'client', 'services'],
            select: {
                services: {
                    id: true,
                    name: true,
                    price: true,
                    employeesSettings: true,
                    duration: true,
                },
                employee: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    jobTitle: true,
                    avatar: true,
                },
                client: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    avatar: true,
                },
            },
        });
    }
}
