import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsString()
    @IsDefined()
    time: string;

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
