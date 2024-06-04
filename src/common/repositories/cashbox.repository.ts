import { Injectable } from '@nestjs/common';
import { Cashbox } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CashboxRepository extends Repository<Cashbox> {
    constructor(private readonly ds: DataSource) {
        super(Cashbox, ds.createEntityManager());
    }

    // ============================================ Get by id

    async getById(id: number): Promise<Cashbox> {
        return await this.findOne({
            where: {
                id,
            },
        });
    }
}
