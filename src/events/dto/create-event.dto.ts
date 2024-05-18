import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { EventTime } from 'src/common/types';

export class CreateEventDto {
    @IsNumber()
    @IsDefined()
    duration: number;

    @IsNumber()
    @IsDefined()
    year: number;

    @IsNumber()
    @IsDefined()
    month: number;

    @IsNumber()
    @IsDefined()
    day: number;

    // @IsString()
    // @IsDefined()
    // from: string;

    // @IsString()
    // @IsDefined()
    // to: string;

    @IsDefined()
    time: EventTime;

    @IsOptional()
    @IsString()
    comments: string;

    @IsArray()
    @IsDefined()
    services: number[];

    @IsNumber()
    @IsDefined()
    employee: number;

    @IsNumber()
    @IsDefined()
    client: number;
}
