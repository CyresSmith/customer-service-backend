import { Module } from '@nestjs/common';
import { EmployeesRepository } from 'src/common/repositories';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository],
})
export class EmployeesModule {}
