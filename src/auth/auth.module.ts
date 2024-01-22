import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesRepository, UsersRepository } from 'src/common/repositories';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as Strategies from './strategies';

@Module({
  imports: [UsersModule, TokenModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    ...Object.values(Strategies),
    AuthService,
    UsersRepository,
    CompaniesRepository,
  ],
})
export class AuthModule {}
