import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Company } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
    constructor(private readonly ds: DataSource) {
        super(Company, ds.createEntityManager());
    }

    // ============================================ Is exist check

    async checkIsExist(name: string, phoneNumbers: string[]): Promise<boolean> {
        const nameExist = await this.findOneBy({ name });

        if (nameExist && nameExist?.id) {
            throw new BadRequestException(`Company with name "${name}" already exist`);
        }

        for (const phone of phoneNumbers) {
            const exist = await this.createQueryBuilder('company')
                .where(`:phone = ANY(SELECT jsonb_array_elements_text("company"."phones"))`, {
                    phone,
                })
                .getOne();

            if (exist) {
                throw new BadRequestException(`Phone ${phone} is already registered!`);
            }
        }

        return false;
    }

    // ============================================ Get by id

    async getById(id: number): Promise<Company> {
        const company = await this.findOne({
            relations: ['activities', 'employees', 'employees.user'],
            where: {
                id,
            },
            select: {
                activities: { id: true, name: true },
                employees: {
                    id: true,
                    role: true,
                    user: {
                        id: true,
                    },
                },
            },
        });

        if (!company) {
            throw new NotFoundException('Компанію не знайдено!');
        }

        return company;
    }

    // ============================================ Get Profile

    async getProfile(id: number): Promise<Company> {
        return await this.findOne({
            relations: ['activities'],
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                address: true,
                avatar: true,
                images: true,
                phones: true,
                workingHours: true,
                activities: { id: true, name: true },
            },
        });
    }
}
