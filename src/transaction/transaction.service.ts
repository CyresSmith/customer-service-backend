import { BadRequestException, Injectable } from '@nestjs/common';
import { Company } from 'db/entities';
import { CashboxService } from 'src/cashbox/cashbox.service';
import {
    CashboxRepository,
    EmployeesRepository,
    TransactionRepository,
} from 'src/common/repositories';
import { TransactionType } from 'src/common/types';
import { Between, In } from 'typeorm';
import { ChangeBalanceDto } from './dto/change-balance.dto';
import { MovingTransactionDto } from './dto/moving-transaction.dto';
import { PurchaseTransactionDto } from './dto/purchase-transaction.dto';
import { SalaryTransactionDto } from './dto/salary-transaction.dto';
import { SellTransactionDto } from './dto/sell-transaction.dto';
import { ServiceTransactionDto } from './dto/service-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly cashboxRepository: CashboxRepository,
        private readonly employeesRepository: EmployeesRepository,
        private readonly cashboxService: CashboxService
    ) {}

    // ================================= Service Transaction

    async createServiceTransaction(companyId: number, dto: ServiceTransactionDto) {
        const { cashbox, client, employees, creator, events, services, ...data } = dto;

        let transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            creator: { id: creator },
            client: { id: client },
            category: { id: 1 },
            type: 'income' as TransactionType,
        };

        if (events) {
            const eventTransactions = await this.transactionRepository.find({
                where: {
                    events: { id: In(events) },
                },
            });

            if (eventTransactions.length > 0) {
                throw new BadRequestException(
                    `Записи ${eventTransactions.map(({ id }) => `id ${id}, `)}вже враховано!`
                );
            }

            transactionData = Object.assign(transactionData, {
                events: events.map(id => ({
                    id,
                })),
            });
        }

        if (services) {
            transactionData = Object.assign(transactionData, {
                services: services.map(id => ({
                    id,
                })),
            });
        }

        const newTransaction = this.transactionRepository.create(transactionData);

        const existEmployees = await this.employeesRepository.find({
            where: { id: In(employees) },
            relations: ['transactions'],
        });

        existEmployees.forEach(employee => {
            employee.transactions = [...employee.transactions, newTransaction];
            this.employeesRepository.save(employee);
        });

        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.updateBalance(companyId, cashbox, data.amount);
        }

        return transaction;
    }

    // ================================= Sell Transaction

    async createSellTransaction(companyId: number, dto: SellTransactionDto) {
        const { cashbox, creator, client, ...data } = dto;

        let transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            creator: { id: creator },
            category: { id: 2 },
            type: 'income' as TransactionType,
        };

        if (client) {
            transactionData = Object.assign(transactionData, { client: { id: client } });
        }

        const newTransaction = this.transactionRepository.create(transactionData);
        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.updateBalance(companyId, cashbox, data.amount);
        }

        return transaction;
    }

    // ================================= Moving Transaction

    async createMovingTransaction(companyId: number, dto: MovingTransactionDto) {
        const { cashbox, creator, toCashboxId, ...data } = dto;

        const transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            toCashboxId: { id: toCashboxId },
            creator: { id: creator },
            category: { id: 3 },
            type: 'moving' as TransactionType,
        };

        const newTransaction = this.transactionRepository.create(transactionData);
        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.updateBalance(companyId, cashbox, -dto.amount);
            await this.cashboxService.updateBalance(companyId, dto.toCashboxId, dto.amount);
        }

        return transaction;
    }

    // ================================= Purchase Transaction

    async createPurchaseTransaction(companyId: number, dto: PurchaseTransactionDto) {
        const { cashbox, creator, ...data } = dto;

        const transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            creator: { id: creator },
            category: { id: 4 },
            type: 'expense' as TransactionType,
        };

        const newTransaction = this.transactionRepository.create(transactionData);

        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.updateBalance(companyId, cashbox, -data.amount);
        }

        return transaction;
    }

    // ================================= Salary Transaction

    async createSalaryTransaction(companyId: number, dto: SalaryTransactionDto) {
        const { cashbox, creator, employee, ...data } = dto;

        const transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            creator: { id: creator },
            employee: { id: employee },
            category: { id: 5 },
            type: 'expense' as TransactionType,
        };

        const newTransaction = this.transactionRepository.create(transactionData);
        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.updateBalance(companyId, cashbox, -data.amount);
        }

        return transaction;
    }

    // ================================= Change Balance Transaction

    async createChangeBalanceTransaction(companyId: number, dto: ChangeBalanceDto) {
        const { cashbox, creator, balance, ...data } = dto;

        const currentBalance = (await this.cashboxService.findOne(companyId, cashbox)).balance;

        const amount =
            balance > currentBalance
                ? balance - currentBalance
                : balance < currentBalance
                  ? currentBalance - balance
                  : balance;

        const transactionData = {
            ...data,
            company: { id: +companyId },
            cashbox: { id: cashbox },
            creator: { id: creator },
            amount,
            category: { id: 6 },
            type: 'change' as TransactionType,
        };

        const newTransaction = this.transactionRepository.create(transactionData);
        const transaction = await this.transactionRepository.save(newTransaction);

        if (transaction) {
            await this.cashboxService.changeBalance(companyId, cashbox, balance);
        }

        return transaction;
    }

    // ================================= Find Transactions

    async findAll(where: {
        company: Company;
        year: number;
        month: number;
        day: number;
        time: number;
    }) {
        return await this.transactionRepository.find({ where, order: { createdAt: 'DESC' } });
    }

    // ================================= Find Period

    async findPeriod(companyId: number, period: { from: string; to: string }) {
        const from = new Date(period.from);
        const to = new Date(period.to);

        const data = await this.transactionRepository.find({
            where: {
                company: { id: companyId },
                createdAt: Between(from, to),
            },
            relations: ['category', 'cashbox'],
            order: { createdAt: 'DESC' },
        });

        return data;
    }

    findOne(id: number) {
        return `This action returns a #${id} transaction`;
    }

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} transaction`;
    }
}
