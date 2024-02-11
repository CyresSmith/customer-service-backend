import { Injectable } from '@nestjs/common';
import { Client } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(private readonly ds: DataSource) {
    super(Client, ds.createEntityManager());
  }

  getById(companyId: number, id: number): Promise<Client> {
    return this.findOne({
      where: {
        id,
        company: { id: companyId },
      },
    });
  }

  getByPhone(companyId: number, phone: string): Promise<Client> {
    return this.findOne({
      where: {
        phone,
        company: { id: companyId },
      },
    });
  }
}
