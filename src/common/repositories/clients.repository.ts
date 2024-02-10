import { Injectable } from '@nestjs/common';
import { Client } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(private readonly ds: DataSource) {
    super(Client, ds.createEntityManager());
  }

  // findInCompany(id: number, companyId: number): Promise<Client> {
  //   return this.findOne({
  //     where: {
  //       id,
  //       company: companyId,
  //     },
  //   });
  // }

  getById(id: number): Promise<Client> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
