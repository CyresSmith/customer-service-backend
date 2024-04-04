import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
    constructor(private readonly ds: DataSource) {
        super(Category, ds.createEntityManager());
    }

    async checkIsExist(name: string): Promise<boolean> {
        const isExist = await this.findOneBy({ name });

        if (isExist) {
            throw new BadRequestException(`Category with name "${name}" is already exist`);
        }

        return false;
    }

    getById(id: number): Promise<Category> {
        return this.findOne({
            where: {
                id,
            },
        });
    }
}
