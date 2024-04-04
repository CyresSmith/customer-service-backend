import { Module } from '@nestjs/common';
import { ActivityRepository } from 'src/common/repositories';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

@Module({
    controllers: [ActivitiesController],
    providers: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
