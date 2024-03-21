import { Module } from '@nestjs/common';
import { EmployeesRepository, UsersRepository } from 'src/common/repositories';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'db/entities';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    EmployeesRepository,
    UsersRepository,
    UsersService,
    EmailService,
  ],
  exports: [EmployeesService],
})
export class EmployeesModule {}
