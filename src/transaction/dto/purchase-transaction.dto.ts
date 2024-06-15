import { IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class PurchaseTransactionDto extends CreateTransactionDto {
    @IsString()
    comments: string;
}
