import { Injectable } from '@nestjs/common';
import { Service } from 'db/entities';
import { ServicesRepository } from 'src/common/repositories';
import { ServicesCategoriesRepository } from 'src/common/repositories/servicesCategories.repository';
import { IBasicServiceInfo } from 'src/common/types';
import { DeepPartial } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly servicesCategoriesRepository: ServicesCategoriesRepository
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

    const newService = this.servicesRepository.create(
      createServiceObj as DeepPartial<Service>
    );

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
      category: category.name,
    };
  }

  // ============================================ get company services

  async getServices(companyId: number): Promise<IBasicServiceInfo[]> {
    const services = await this.servicesRepository.find({
      where: { company: { id: companyId } },
      relations: ['category'],
      select: {
        id: true,
        name: true,
        avatar: true,
        duration: true,
        price: true,
        type: true,
        category: { name: true },
      },
    });

    console.log('🚀 ~ ServicesService ~ getServices ~ services:', services);

    return services.map(item => ({ ...item, category: item.category.name }));
  }

  // ============================================

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
