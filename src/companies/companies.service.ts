import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Company, User } from 'db/entities';
import { RolesEnum } from 'src/common/enums';
import {
  CompaniesRepository,
  EmployeesRepository,
} from 'src/common/repositories';
import { EmployeeDto } from 'src/employees/dto/employee.dto';
import { IBasicUserInfo } from 'src/users/users.types';
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

  // ============================================ Add exist user employee

  async addExistUserEmployee(
    userId: number,
    employeeData: EmployeeDto,
    companyId: number
  ): Promise<any> {
    const existEmployee =
      this.employeesRepository.isEmployeeUserExistCheck(userId);

    if (existEmployee) {
      throw new BadRequestException('Employee for this user is already exist');
    }

    const newEmployee = this.employeesRepository.create({
      ...employeeData,
      category: employeeData.category as DeepPartial<Category>,
      user: userId as DeepPartial<User>,
      company: companyId as DeepPartial<Company>,
    });

    return await this.employeesRepository.save(newEmployee);
  }

  // ============================================ Add new user employee

  async addNewUserEmployee(
    user: IBasicUserInfo,
    employeeData: EmployeeDto,
    companyId: number
  ): Promise<any> {
    const newEmployee = this.employeesRepository.create({
      ...employeeData,
      category: employeeData.category as DeepPartial<Category>,
      user,
      company: companyId as DeepPartial<Company>,
    });

    return await this.employeesRepository.save(newEmployee);
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
