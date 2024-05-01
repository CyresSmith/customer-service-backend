import { IsArray, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ChannelType } from 'db/entities/message.entity';

export class CreateChannelDto {
    @IsString()
    @Length(3, 20)
    @IsOptional()
    name: string;

    @IsString()
    type: ChannelType;

    @IsArray()
    users: number[];

    @IsNumber()
    company: number;
}
