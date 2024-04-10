import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'db/entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CompaniesRepository, EmployeesRepository, UsersRepository } from 'src/common/repositories';
import { EmailService } from 'src/email/email.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), UsersModule, CloudinaryModule],
    controllers: [EmployeesController],
    providers: [
        EmployeesService,
        EmployeesRepository,
        UsersRepository,
        UsersService,
        EmailService,
        CompaniesRepository,
    ],
    exports: [EmployeesService],
})
export class EmployeesModule {}
