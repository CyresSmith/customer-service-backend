import { Module } from '@nestjs/common';
import { ServicesRepository } from 'src/common/repositories';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
