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
import { UsersModule } from 'src/users/users.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UsersModule, CloudinaryModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesRepository,
    CompaniesService,
    EmployeesRepository,
    UsersRepository,
    CategoriesRepository,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
