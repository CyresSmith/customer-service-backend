import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Action } from '../../../db/entities/action.entity';

@Injectable()
export class ActionRepository extends Repository<Action> {
  constructor(private readonly ds: DataSource) {
    super(Action, ds.createEntityManager());
  }

  // ============================================ Get by id

  async getById(id: number) {
    const action = await this.findOne({
      where: {
        id,
      },
    });

    return action;
  }
}
