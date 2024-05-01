import { Injectable } from '@nestjs/common';
import { MessagesRepository } from 'src/common/repositories';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
    constructor(private messagesRepository: MessagesRepository) {}

    async create(createMessageDto: CreateMessageDto) {
        const { from, channelId, content } = createMessageDto;

        const newMessage = this.messagesRepository.create({
            content,
            from: { id: from },
            channel: { id: channelId },
        });

        return await this.messagesRepository.save(newMessage);
    }

    findAll() {
        return `This action returns all messages`;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageDto: UpdateMessageDto) {
        console.log(updateMessageDto);

        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
}
