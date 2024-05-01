import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsNumber()
    from: number;

    @IsNumber()
    channelId: number;

    @IsString()
    content: string;
}
