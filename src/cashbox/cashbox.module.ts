import { Module } from '@nestjs/common';
import { CashboxRepository, EmployeesRepository } from 'src/common/repositories';
import { CashboxController } from './cashbox.controller';
import { CashboxService } from './cashbox.service';

@Module({
    controllers: [CashboxController],
    providers: [CashboxService, CashboxRepository, EmployeesRepository],
})
export class CashboxModule {}
