import { OmitType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class ChangeBalanceDto extends OmitType(CreateTransactionDto, ['amount']) {
    @IsNumber()
    balance: number;

    @IsString()
    comments: string;
}
