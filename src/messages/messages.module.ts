import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from 'src/common/repositories';

@Module({
    controllers: [MessagesController],
    providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
