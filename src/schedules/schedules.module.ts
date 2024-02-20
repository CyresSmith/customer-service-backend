import { Module } from '@nestjs/common';
import { SchedulesRepository } from 'src/common/repositories';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulesRepository],
})
export class SchedulesModule {}
