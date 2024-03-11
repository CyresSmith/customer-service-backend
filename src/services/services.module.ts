import { Module } from '@nestjs/common';
import { ServicesRepository } from 'src/common/repositories';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesCategoriesRepository } from 'src/common/repositories/servicesCategories.repository';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService,
    ServicesRepository,
    ServicesCategoriesRepository,
  ],
})
export class ServicesModule {}
