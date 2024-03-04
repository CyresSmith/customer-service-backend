import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceCategory } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ServicesCategoriesRepository extends Repository<ServiceCategory> {
  constructor(private readonly ds: DataSource) {
    super(ServiceCategory, ds.createEntityManager());
  }

  async checkIsExist(name: string): Promise<boolean> {
    const isExist = await this.findOneBy({ name });

    if (isExist) {
      throw new BadRequestException(
        `Category with name "${name}" is already exist`
      );
    }

    return false;
  }

  getById(id: number): Promise<ServiceCategory> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
