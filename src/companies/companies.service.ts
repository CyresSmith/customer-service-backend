import { BadRequestException, Injectable } from '@nestjs/common';
import { Activity, Category, Company, Employee, User } from 'db/entities';
import { RolesEnum } from 'src/common/enums';
import {
  CategoriesRepository,
  CompaniesRepository,
  EmployeesRepository,
} from 'src/common/repositories';
import { EmployeeDto } from 'src/employees/dto/employee.dto';
import { DeepPartial } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IBasicUserInfo } from 'src/users/users.types';

@Injectable()
export class CompaniesService {
  constructor(
    private companyRepository: CompaniesRepository,
    private employeesRepository: EmployeesRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  // ============================================ Create company

  async create(
    createCompanyDto: CreateCompanyDto,
    owner: number
  ): Promise<Partial<Company>> {
    const { name, phones, category } = createCompanyDto;

    await this.companyRepository.checkIsExist(name, phones);
    const isCategoryExist = await this.categoriesRepository.getById(category);

    if (!isCategoryExist) {
      throw new BadRequestException('Category not found');
    }

    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
      category: { id: category },
      activities: createCompanyDto.activities.map(id => ({ id })),
    });

    const company = await this.companyRepository.save(newCompany);

    const newEmployee = this.employeesRepository.create({
      user: owner as DeepPartial<User>,
      role: RolesEnum.OWNER,
      company: company.id as DeepPartial<Company>,
    });

    await this.employeesRepository.save(newEmployee);

    return { id: company.id, name: company.name };
  }

  // ============================================ Add exist user employee

  async addExistUserEmployee(
    userId: number,
    employeeData: EmployeeDto,
    companyId: number
  ): Promise<Employee> {
    const existEmployee = await this.employeesRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    });

    if (existEmployee) {
      throw new BadRequestException('Співробітник вже зареєстровано!');
    }

    const newEmployee = this.employeesRepository.create({
      ...employeeData,
      // category: employeeData.category as DeepPartial<Category>,
      user: userId as DeepPartial<User>,
      company: companyId as DeepPartial<Company>,
    });

    const employee = await this.employeesRepository.save(newEmployee);

    return await this.employeesRepository.getById(employee.id);
  }

  // ============================================ Check is user employee exist

  async checkIsEmployeeExist(email: string, companyId: number) {
    const employee = await this.employeesRepository.findOne({
      where: { user: { email }, company: { id: companyId } },
    });

    if (employee) {
      throw new BadRequestException(
        'Співробітник з цією поштою вже зареєстровано!'
      );
    }
  }

  // ============================================ Add new user employee

  async addNewUserEmployee(
    user: IBasicUserInfo,
    employeeData: EmployeeDto,
    companyId: number
  ): Promise<Employee> {
    const newEmployee = this.employeesRepository.create({
      ...employeeData,
      // category: employeeData.category as DeepPartial<Category>,
      user,
      company: companyId as DeepPartial<Company>,
    });

    return await this.employeesRepository.save(newEmployee);
  }

  // ============================================ Get company profile

  async getProfile(id: number): Promise<Company> {
    const company = await this.companyRepository.getProfile(id);

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    return company;
  }

  // ============================================ Get company Activities

  async getActivities(id: number): Promise<Activity[]> {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
      relations: ['category', 'category.activities'],
      select: {
        category: {
          id: true,
          activities: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    return company.category.activities;
  }

  // ============================================ Update company avatar

  async updateAvatar(id: number, dto: { avatar: string }) {
    return await this.companyRepository.update(id, dto);
  }

  // ============================================ Update company profile

  async updateProfile(id: number, data: UpdateCompanyDto) {
    const isExist = await this.companyRepository.findOneBy({ id });

    if (!isExist) {
      throw new BadRequestException(`Company with id "${id}" not found`);
    }
    const { activities, category, ...filteredData } = data;

    if (activities) {
      isExist.activities = activities.map(id => ({ id })) as Activity[];

      await this.companyRepository.save(isExist);
    }

    if (category) {
      isExist.category = { id: category } as Category;

      await this.companyRepository.save(isExist);
    }

    return await this.companyRepository.update(id, filteredData);
  }

  // ============================================

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return this.companyRepository.getById(id);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return 'update';
    // return await this.companyRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
