import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'db/entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import {
  CategoriesRepository,
  CompaniesRepository,
  EmployeesRepository,
  SchedulesRepository,
  UsersRepository,
} from 'src/common/repositories';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeesService } from 'src/employees/employees.service';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { SchedulesService } from 'src/schedules/schedules.service';
import { UsersModule } from 'src/users/users.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    UsersModule,
    CloudinaryModule,
    EmployeesModule,
    SchedulesModule,
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesRepository,
    CompaniesService,
    EmployeesRepository,
    UsersRepository,
    CategoriesRepository,
    EmployeesService,
    SchedulesService,
    SchedulesRepository,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
