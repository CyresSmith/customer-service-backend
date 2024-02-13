import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'db/entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import {
  CategoriesRepository,
  CompaniesRepository,
  EmployeesRepository,
  UsersRepository,
} from 'src/common/repositories';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersModule } from 'src/users/users.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    UsersModule,
    CloudinaryModule,
    EmployeesModule,
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesRepository,
    CompaniesService,
    EmployeesRepository,
    UsersRepository,
    CategoriesRepository,
    EmployeesService,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
