import { Module } from '@nestjs/common';
import {
    CashboxRepository,
    EmployeesRepository,
    TransactionRepository,
} from 'src/common/repositories';
import { TransactionService } from 'src/transaction/transaction.service';
import { CashboxController } from './cashbox.controller';
import { CashboxService } from './cashbox.service';

@Module({
    controllers: [CashboxController],
    providers: [
        CashboxService,
        CashboxRepository,
        EmployeesRepository,
        TransactionService,
        TransactionRepository,
    ],
})
export class CashboxModule {}
