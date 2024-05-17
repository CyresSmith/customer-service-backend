import { Module } from '@nestjs/common';
import { ChannelsRepository, MessagesRepository } from 'src/common/repositories';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
    controllers: [ChannelsController],
    providers: [ChannelsService, ChannelsRepository, MessagesRepository],
})
export class ChannelsModule {}
