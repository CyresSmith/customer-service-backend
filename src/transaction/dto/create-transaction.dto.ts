import { IsNumber, Max } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    year: number;

    @IsNumber()
    month: number;

    @IsNumber()
    day: number;

    @IsNumber()
    @Max(86400000)
    time: number;

    @IsNumber()
    amount: number;

    @IsNumber()
    cashbox: number;

    @IsNumber()
    creator: number;
}
