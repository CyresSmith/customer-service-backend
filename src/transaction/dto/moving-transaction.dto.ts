import { IsNumber, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class MovingTransactionDto extends CreateTransactionDto {
    @IsNumber()
    toCashboxId: number;

    @IsString()
    comments: string;
}
