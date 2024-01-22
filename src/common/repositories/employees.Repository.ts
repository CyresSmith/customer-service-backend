import { Injectable } from '@nestjs/common';
import { Employee } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EmployeesRepository extends Repository<Employee> {
  constructor(private readonly ds: DataSource) {
    super(Employee, ds.createEntityManager());
  }

  getById(id: number): Promise<Employee> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
