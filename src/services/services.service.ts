import { Injectable } from '@nestjs/common';
import { Service } from 'db/entities';
import { ServicesRepository } from 'src/common/repositories';
import { DeepPartial } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  // ============================================ Create new service

  async create(
    createServiceDto: CreateServiceDto,
    companyId: number
  ): Promise<Service> {
    const { name, employees, resources } = createServiceDto;

    await this.servicesRepository.checkIsExist(name, companyId);

    let createServiceObj = {
      ...createServiceDto,
      company: { id: companyId },
      category: { id: createServiceDto.category },
    };

    if (employees.length > 0) {
      createServiceObj = Object.assign(createServiceObj, {
        employees: employees.map(item => ({ id: item })),
      });
    } else {
      delete createServiceObj.employees;
    }

    if (resources.length > 0) {
      createServiceObj = Object.assign(createServiceObj, {
        resources: resources.map(item => ({ id: item })),
      });
    } else {
      delete createServiceObj.resources;
    }

    const newService = this.servicesRepository.create(
      createServiceObj as DeepPartial<Service>
    );

    return await this.servicesRepository.save(newService);
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
