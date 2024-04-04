import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'db/entities';
import { CompaniesRepository, UsersRepository } from 'src/common/repositories';
import { EmailService } from 'src/email/email.service';
import { TokenModule } from 'src/token/token.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TokenModule, CloudinaryModule],
    controllers: [UsersController],
    providers: [UsersRepository, UsersService, EmailService, CompaniesRepository],
    exports: [UsersService],
})
export class UsersModule {}
