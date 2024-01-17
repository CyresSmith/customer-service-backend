import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'db/entities';
import { UsersRepository } from 'src/common/repositories';
import { EmailService } from 'src/email/email.service';
import { TokenModule } from 'src/token/token.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}
