import { Injectable } from '@nestjs/common';
import { Company, User } from 'db/entities';
import { RolesEnum } from 'src/common/enums';
import {
  CompaniesRepository,
  EmployeesRepository,
} from 'src/common/repositories';
import { DeepPartial } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private companyRepository: CompaniesRepository,
    private employeesRepository: EmployeesRepository
  ) {}

  // ============================================ Create company

  async create(
    createCompanyDto: CreateCompanyDto,
    owner: number
  ): Promise<Company> {
    const { name, phones } = createCompanyDto;

    await this.companyRepository.isExistCheck(name, phones);

    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
    });

    const company = await this.companyRepository.save(newCompany);

    const newEmployee = this.employeesRepository.create({
      user: owner as DeepPartial<User>,
      role: RolesEnum.OWNER,
      company: company.id as DeepPartial<Company>,
    });

    await this.employeesRepository.save(newEmployee);

    return company;
  }

  // ============================================

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return this.companyRepository.getById(id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
