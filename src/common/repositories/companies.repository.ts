import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(
        `Company with name "${name}" already exist`
      );
    }

    for (const phone of phoneNumbers) {
      const exist = await this.createQueryBuilder('company')
        .where(
          `:phone = ANY(SELECT jsonb_array_elements_text("company"."phones"))`,
          { phone }
        )
        .getOne();

      if (exist) {
        throw new BadRequestException(`Phone ${phone} is already registered!`);
      }
    }

    return false;
  }

  // ============================================ Get by id

  getById(id: number): Promise<Company> {
    return this.findOne({
      relations: [
        'employees',
        'employees.user',
        'employees.category',
        'activities',
      ],
      where: {
        id,
      },
      select: {
        activities: { id: true, name: true },
        employees: {
          id: true,
          jobTitle: true,
          role: true,
          status: true,
          category: {
            id: true,
            name: true,
          },
          user: {
            id: true,
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
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
        workingHours: {
          monday: {
            from: true,
            to: true,
          },
          tuesday: {
            from: true,
            to: true,
          },
          wednesday: {
            from: true,
            to: true,
          },
          thursday: {
            from: true,
            to: true,
          },
          friday: {
            from: true,
            to: true,
          },
          saturday: {
            from: true,
            to: true,
          },
          sunday: {
            from: true,
            to: true,
          },
        },
        activities: { id: true, name: true },
      },
    });
  }
}
