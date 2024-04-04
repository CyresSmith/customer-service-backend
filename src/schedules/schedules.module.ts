import { Module } from '@nestjs/common';
import { EmployeesRepository, SchedulesRepository, UsersRepository } from 'src/common/repositories';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
    controllers: [SchedulesController],
    providers: [
        SchedulesService,
        SchedulesRepository,
        EmployeesService,
        EmployeesRepository,
        UsersRepository,
    ],
    exports: [SchedulesService],
})
export class SchedulesModule {}
