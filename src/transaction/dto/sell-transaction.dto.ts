import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class SellTransactionDto extends CreateTransactionDto {
    @IsOptional()
    @IsNumber()
    client: number;

    @IsString()
    comments: string;
}
