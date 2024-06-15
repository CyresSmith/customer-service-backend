import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class ServiceTransactionDto extends CreateTransactionDto {
    @IsNumber()
    client: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    events: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    services: number[];

    @IsNumber({}, { each: true })
    employees: number[];

    @IsOptional()
    @IsString()
    comments: string;
}
