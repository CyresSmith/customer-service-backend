import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'db/entities';
import { ClientsRepository } from 'src/common/repositories';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), CloudinaryModule],
  controllers: [ClientsController],
  providers: [ClientsRepository, ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
