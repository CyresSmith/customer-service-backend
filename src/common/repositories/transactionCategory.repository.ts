import { Injectable } from '@nestjs/common';
import { TransactionCategory } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TransactionCategoryRepository extends Repository<TransactionCategory> {
    constructor(private readonly ds: DataSource) {
        super(TransactionCategory, ds.createEntityManager());
    }

    // ============================================ Get by id

    async getById(id: number): Promise<TransactionCategory> {
        return await this.findOne({
            where: {
                id,
            },
        });
    }
}
