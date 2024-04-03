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
        'activities',
        'employees',
        'employees.user',
        // 'employees.category',
        // 'employees.schedules',
        // 'services',
        // 'services.category',
        // 'employees.services',
        // 'employees.services.category',
      ],
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
            // email: true,
            // phone: true,
            // firstName: true,
            // lastName: true,
            // avatar: true,
          },
          // jobTitle: true,
          // provider: true,
          // status: true,
          // avatar: true,
          // info: true,
          // email: true,
          // phone: true,
          // firstName: true,
          // lastName: true,
          // birthday: true,
          // gender: true,
          // schedules: {
          //   year: true,
          //   month: true,
          //   schedule: true,
          // },
          // category: {
          //   id: true,
          //   name: true,
          // },
        },
        // services: {
        //   id: true,
        //   name: true,
        //   avatar: true,
        //   duration: true,
        //   price: true,
        //   type: true,
        //   category: { id: true, name: true },
        // },
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
        workingHours: true,
        activities: { id: true, name: true },
      },
    });
  }
}
