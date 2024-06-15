import { IsString } from 'class-validator';
import { TransactionType } from 'src/common/types';

export class CreateTransactionCategoryDto {
    @IsString()
    name: string;

    @IsString()
    type: TransactionType;
}
