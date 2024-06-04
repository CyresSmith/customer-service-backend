import { Injectable } from '@nestjs/common';
import { Transaction } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    constructor(private readonly ds: DataSource) {
        super(Transaction, ds.createEntityManager());
    }

    // ============================================ Get by id

    async getById(id: number): Promise<Transaction> {
        return await this.findOne({
            where: {
                id,
            },
        });
    }
}
