import { IsNumber, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class SalaryTransactionDto extends CreateTransactionDto {
    @IsNumber()
    employee: number;

    @IsString()
    comments: string;
}
