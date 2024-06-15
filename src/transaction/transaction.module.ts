import { Module } from '@nestjs/common';
import { CashboxService } from 'src/cashbox/cashbox.service';
import {
    CashboxRepository,
    EmployeesRepository,
    TransactionRepository,
} from 'src/common/repositories';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
    controllers: [TransactionController],
    providers: [
        TransactionService,
        TransactionRepository,
        CashboxRepository,
        CashboxService,
        EmployeesRepository,
    ],
})
export class TransactionModule {}
