import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EmployeesRepository extends Repository<Employee> {
  constructor(private readonly ds: DataSource) {
    super(Employee, ds.createEntityManager());
  }

  // ============================================ Is exist check

  async checkIsExist(userId: number): Promise<boolean> {
    const isExist = await this.findOneBy({
      user: { id: userId },
    });

    if (isExist) {
      throw new BadRequestException(
        `Employee for user ${userId} is already exist`
      );
    }

    return false;
  }

  // ============================================ Get by id

  getById(id: number): Promise<Employee> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
