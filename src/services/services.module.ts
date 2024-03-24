import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  EmployeesRepository,
  ServicesRepository,
} from 'src/common/repositories';
import { ServicesCategoriesRepository } from 'src/common/repositories/servicesCategories.repository';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService,
    ServicesRepository,
    ServicesCategoriesRepository,
    CloudinaryService,
    EmployeesRepository,
  ],
})
export class ServicesModule {}
