import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'db/entities';
import {
  CompaniesRepository,
  EmployeesRepository,
} from 'src/common/repositories';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesRepository, CompaniesService, EmployeesRepository],
  exports: [CompaniesService],
})
export class CompaniesModule {}
