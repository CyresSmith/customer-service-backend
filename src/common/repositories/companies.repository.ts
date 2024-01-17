import { Injectable } from '@nestjs/common';
import { Company } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
  constructor(private readonly ds: DataSource) {
    super(Company, ds.createEntityManager());
  }

  getCompanyById(id: number): Promise<Company> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
