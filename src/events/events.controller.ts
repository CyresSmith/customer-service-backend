import {
    Body,
    Controller,
    Get,
    // Delete,
    // Get,
    HttpCode,
    // Param,
    // Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
// import { Roles } from 'src/common/decorators';
// import { RolesEnum } from 'src/common/enums';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { EventDataType } from 'src/common/types';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { Company } from 'db/entities';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    // ============================================ Create new service

    // @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('create')
    @HttpCode(201)
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Query('companyId') companyId: number
    ): Promise<EventDataType> {
        return await this.eventsService.createEvent(createEventDto, companyId);
    }

    // ============================================ Get company events

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    @HttpCode(200)
    async getAllEvents(
        @Query('companyId') companyId: number,
        @Query('year') year: number,
        @Query('month') month: number,
        @Query('day') day: number
    ): Promise<EventDataType[]> {
        let params = { company: { id: companyId } as Company, year, month };

        if (day) {
            params = Object.assign(params, { day });
        }

        return await this.eventsService.getCompanyEvents(params);
    }
}
