import { BadRequestException, Injectable } from '@nestjs/common';
import { Company, Employee, Service, User } from 'db/entities';
import { EmployeesRepository, UsersRepository } from 'src/common/repositories';
import { DeepPartial } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { IBasicEmployee } from './employees.types';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        private readonly employeesRepository: EmployeesRepository,
        private readonly usersRepository: UsersRepository
    ) {}

    // ============================================ Get one

    async getOne(companyId: number, id: number) {
        return await this.employeesRepository.getById(companyId, id);
    }

    // ============================================ Get all employees from Company

    async getAllFromCompany(companyId: number): Promise<IBasicEmployee[]> {
        const employeesData = await this.employeesRepository.find({
            where: {
                company: { id: companyId },
            },
            relations: ['user', 'services'],
            select: {
                id: true,
                firstName: true,
                lastName: true,
                jobTitle: true,
                status: true,
                avatar: true,
                services: { id: true },
                provider: true,
                user: {
                    firstName: true,
                    lastName: true,
                },
            },
        });

        return employeesData.map(({ firstName, lastName, user, services, ...rest }) => ({
            ...rest,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            servicesCount: services.length,
        }));
    }

    // ============================================ Check is user employee exist

    async checkIsEmployeeExist(email: string, companyId: number) {
        const employee = await this.employeesRepository.findOne({
            where: { user: { email }, company: { id: companyId } },
        });

        if (employee) {
            throw new BadRequestException('Співробітник з цією поштою вже зареєстровано!');
        }
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

        const user = await this.usersRepository.findOneBy({ id: userId });

        if (!user) {
            throw new BadRequestException('Користувач не знайдено');
        }

        const newEmployee = this.employeesRepository.create({
            ...employeeData,
            // category: employeeData.category as DeepPartial<Category>,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            user: userId as DeepPartial<User>,
            company: companyId as DeepPartial<Company>,
        });

        const employee = await this.employeesRepository.save(newEmployee);

        return await this.employeesRepository.getById(companyId, employee.id);
    }

    // ============================================ Add new user employee

    async addNewUserEmployee(
        userId: number,
        createEmployeeDto: CreateEmployeeDto,
        companyId: number
    ): Promise<Employee> {
        const { userData, employeeData } = createEmployeeDto;

        const newEmployee = this.employeesRepository.create({
            ...userData,
            ...employeeData,
            // category: employeeData.category as DeepPartial<Category>,
            user: userId as DeepPartial<User>,
            company: companyId as DeepPartial<Company>,
        });

        const employee = await this.employeesRepository.save(newEmployee);

        return await this.employeesRepository.getById(companyId, employee.id);
    }

    // ============================================ Check employee in Company

    async checkCompanyEmployee(companyId: number, employeeId: number): Promise<Employee> {
        const existEmployee = await this.employeesRepository.findOne({
            where: {
                id: employeeId,
                company: { id: companyId },
            },
        });

        if (!existEmployee) {
            throw new BadRequestException('Користувача не існує!');
        }

        return existEmployee;
    }

    // ======================================== Update employee profile

    async updateProfile(id: number, data: UpdateEmployeeProfileDto) {
        return await this.employeesRepository.update(id, data);
    }

    // ======================================== Remove employee service

    async removeEmployeeService(companyId: number, serviceId: number, employeeId: number) {
        const isExist = await this.employeesRepository.findOne({
            where: {
                id: employeeId,
                company: { id: companyId },
            },
            relations: ['services'],
        });

        if (!isExist) throw new BadRequestException('Співробітника не знайдено');

        isExist.services = isExist.services.filter(({ id }) => +id !== +serviceId);

        return await this.employeesRepository.save(isExist);
    }

    // ======================================== Add employee service

    async updateEmployeeServices(companyId: number, services: number[], employeeId: number) {
        const isExist = await this.employeesRepository.findOne({
            where: {
                id: employeeId,
                company: { id: companyId },
            },
            relations: ['services'],
        });

        if (!isExist) throw new BadRequestException('Співробітника не знайдено');

        isExist.services = services.map(id => ({
            id,
        })) as Service[];

        return await this.employeesRepository.save(isExist);
    }

    // ================================================

    // create(createEmployeeDto: CreateEmployeeDto) {
    //   return 'This action adds a new employee';
    // }

    // findAll() {
    //   return `This action returns all employees`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} employee`;
    // }

    // update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    //   return `This action updates a #${id} employee`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} employee`;
    // }
}
