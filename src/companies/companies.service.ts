import { BadRequestException, Injectable } from '@nestjs/common';
import { Activity, Category, Company, User } from 'db/entities';
import { RolesEnum } from 'src/common/enums';
import {
    CategoriesRepository,
    CompaniesRepository,
    EmployeesRepository,
    SchedulesRepository,
    UsersRepository,
} from 'src/common/repositories';
import { SchedulesService } from 'src/schedules/schedules.service';
import { DeepPartial } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
// import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
// import { EmployeeDto } from 'src/employees/dto/employee.dto';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly companyRepository: CompaniesRepository,
        private readonly employeesRepository: EmployeesRepository,
        private readonly usersRepository: UsersRepository,
        private readonly schedulesService: SchedulesService,
        private readonly schedulesRepository: SchedulesRepository,
        private readonly categoriesRepository: CategoriesRepository
    ) {}

    // ============================================ Create company

    async create(createCompanyDto: CreateCompanyDto, owner: number): Promise<Partial<Company>> {
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
        const user = await this.usersRepository.findOneBy({ id: owner });

        const newEmployee = this.employeesRepository.create({
            user: owner as DeepPartial<User>,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: RolesEnum.OWNER,
            company: company.id as DeepPartial<Company>,
        });

        await this.employeesRepository.save(newEmployee);

        return { id: company.id, name: company.name };
    }

    // ============================================== Find one Company

    async findOne(id: number) {
        return await this.companyRepository.getById(id);
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

    async updateProfile(id: number, data: UpdateCompanyProfileDto) {
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

        if (data.workingHours) {
            const allSchedules =
                await this.schedulesService.getAllCompanySchedulesFromCurrentMonth(id);

            if (allSchedules.length > 0) {
                const companyWorkingDays = [
                    ...new Set(data.workingHours.flatMap(({ days }) => days)),
                ];

                await this.schedulesRepository.save(
                    allSchedules.reduce(
                        (acc, employeeMonthSchedule, i) => {
                            const { schedule, year, month } = employeeMonthSchedule;

                            const newSchedule = schedule
                                .filter(({ day }) =>
                                    companyWorkingDays.includes(new Date(year, month, day).getDay())
                                )
                                .map(item => {
                                    const companySchedule = data.workingHours.find(({ days }) =>
                                        days.includes(new Date(year, month, item.day).getDay())
                                    );

                                    if (companySchedule) {
                                        let newItem = { ...item };

                                        if (newItem.hours.from < companySchedule.hours.from) {
                                            newItem = {
                                                ...newItem,
                                                hours: {
                                                    ...newItem.hours,
                                                    from: companySchedule.hours.from,
                                                },
                                            };
                                        }

                                        if (newItem.hours.to > companySchedule.hours.to) {
                                            newItem = {
                                                ...newItem,
                                                hours: {
                                                    ...newItem.hours,
                                                    to: companySchedule.hours.to,
                                                },
                                            };
                                        }

                                        if (
                                            newItem.breakHours?.from <= companySchedule.hours.from
                                        ) {
                                            delete newItem.breakHours;
                                        }

                                        if (newItem.breakHours?.to >= companySchedule.hours.to) {
                                            newItem = {
                                                ...newItem,
                                                hours: {
                                                    ...newItem.hours,
                                                    to: companySchedule.hours.to,
                                                },
                                            };

                                            delete newItem.breakHours;
                                        }

                                        return newItem;
                                    }

                                    return item;
                                });

                            acc[i] = { ...employeeMonthSchedule, schedule: newSchedule };

                            return acc;
                        },
                        [...allSchedules]
                    )
                );
            }
        }

        return await this.companyRepository.update(id, filteredData);
    }

    // ============================================ Update company avatar

    // ============================================

    // findAll() {
    //   return `This action returns all companies`;
    // }

    // async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    //   return 'update';
    //   // return await this.companyRepository.update(id, updateCompanyDto);
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} company`;
    // }
}
