import { BadRequestException, Injectable } from '@nestjs/common';
import { Service } from 'db/entities';
import { EmployeesRepository, ServicesRepository } from 'src/common/repositories';
import { ServicesCategoriesRepository } from 'src/common/repositories/servicesCategories.repository';
import { IBasicServiceInfo, ServiceDataType } from 'src/common/types';
import { DeepPartial } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        private readonly servicesRepository: ServicesRepository,
        private readonly servicesCategoriesRepository: ServicesCategoriesRepository,
        private readonly employeesRepository: EmployeesRepository
    ) {}

    // ============================================ Create new service

    async create(
        createServiceDto: CreateServiceDto,
        companyId: number
    ): Promise<IBasicServiceInfo> {
        const { name, employees, resources } = createServiceDto;

        await this.servicesRepository.checkIsExist(name, companyId);

        let createServiceObj = {
            ...createServiceDto,
            company: { id: companyId },
            category: { id: createServiceDto.category },
        };

        if (employees?.length > 0) {
            createServiceObj = Object.assign(createServiceObj, {
                employees: employees.map(item => ({ id: item })),
            });
        } else {
            delete createServiceObj.employees;
        }

        if (resources?.length > 0) {
            createServiceObj = Object.assign(createServiceObj, {
                resources: resources.map(item => ({ id: item })),
            });
        } else {
            delete createServiceObj.resources;
        }

        const newService = this.servicesRepository.create(createServiceObj as DeepPartial<Service>);

        const service = await this.servicesRepository.save(newService);

        const category = await this.servicesCategoriesRepository.findOneBy({
            id: service.category.id,
        });

        return {
            id: service.id,
            name: service.name,
            avatar: service.avatar,
            duration: service.duration,
            price: service.price,
            type: service.type,
            category: { id: category.id, name: category.name, type: category.type },
            employeesSettings: service.employeesSettings,
        };
    }

    // ============================================ get company services

    async getServices(companyId: number): Promise<IBasicServiceInfo[]> {
        return await this.servicesRepository.find({
            where: { company: { id: companyId } },
            relations: ['category'],
            select: {
                id: true,
                name: true,
                avatar: true,
                duration: true,
                price: true,
                type: true,
                employeesSettings: true,
                category: { id: true, name: true },
            },
        });
    }

    // ============================================ get company service by id

    async getServiceById(companyId: number, serviceId: number): Promise<ServiceDataType> {
        return await this.servicesRepository.findOne({
            where: { company: { id: companyId }, id: serviceId },
            relations: ['category', 'employees'],
        });
    }

    // ============================================ update service by id

    async updateService(companyId: number, serviceId: number, data: Partial<Service>) {
        const isExist = await this.servicesRepository.findOneBy({
            company: { id: companyId },
            id: serviceId,
        });

        if (!isExist) {
            throw new BadRequestException('Service not found');
        }

        const { employees, ...rest } = data;

        if (employees) {
            isExist.employees = employees;

            await this.servicesRepository.save(isExist);
        }

        return await this.servicesRepository.update(
            { company: { id: companyId }, id: serviceId },
            rest
        );
    }

    // ============================================ delete service

    async remove(companyId: number, serviceId: number) {
        const isExist = await this.servicesRepository.findOneBy({
            company: { id: companyId },
            id: serviceId,
        });

        if (!isExist) {
            throw new BadRequestException('Service not found');
        }

        return await this.servicesRepository.delete({
            company: { id: companyId },
            id: serviceId,
        });
    }

    // ============================================

    // findAll() {
    //     return `This action returns all services`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} service`;
    // }

    // update(id: number, updateServiceDto: UpdateServiceDto) {
    //     return `This action updates a #${id} service`;
    // }
}
