import { BadRequestException, Injectable } from '@nestjs/common';
import { Service } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ServicesRepository extends Repository<Service> {
    constructor(private readonly ds: DataSource) {
        super(Service, ds.createEntityManager());
    }

    // ============================================ Is exist check

    async checkIsExist(name: string, companyId: number): Promise<boolean> {
        const isExist = await this.findOneBy({
            name,
            company: { id: companyId },
        });

        if (isExist) {
            throw new BadRequestException(
                `Service with name "${name}" for company ${companyId} is already exist`
            );
        }

        return false;
    }

    // ============================================ Get by id

    getById(id: number): Promise<Service> {
        return this.findOne({
            where: {
                id,
            },
        });
    }
}
