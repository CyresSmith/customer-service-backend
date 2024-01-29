import { BadRequestException, Injectable } from '@nestjs/common';
import { Activity } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(private readonly ds: DataSource) {
    super(Activity, ds.createEntityManager());
  }

  // ============================================ Is exist check

  async checkIsExist(name: string): Promise<boolean> {
    const isExist = await this.findOneBy({ name });

    if (isExist) {
      throw new BadRequestException(
        `Activity with name "${name}" is already exist`
      );
    }

    return false;
  }

  // ============================================ Get by id

  async getById(id: number): Promise<Activity> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
