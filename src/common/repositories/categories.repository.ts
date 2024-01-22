import { Injectable } from '@nestjs/common';
import { Category } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
  constructor(private readonly ds: DataSource) {
    super(Category, ds.createEntityManager());
  }

  getById(id: number): Promise<Category> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
