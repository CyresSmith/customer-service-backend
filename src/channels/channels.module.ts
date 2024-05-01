import { Module } from '@nestjs/common';
import { ChannelsRepository } from 'src/common/repositories';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
    controllers: [ChannelsController],
    providers: [ChannelsService, ChannelsRepository],
})
export class ChannelsModule {}
