import { Injectable } from '@nestjs/common';
import { Service } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ServicesRepository extends Repository<Service> {
  constructor(private readonly ds: DataSource) {
    super(Service, ds.createEntityManager());
  }

  isExistCheck(name: string, companyId: number): Promise<Service> {
    return this.findOne({
      where: {
        name,
        company: { id: companyId },
      },
    });
  }

  getById(id: number): Promise<Service> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
