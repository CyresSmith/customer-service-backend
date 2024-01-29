import { Injectable } from '@nestjs/common';
import { Category, Company, Employee, Resource, Service } from 'db/entities';
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
    const { name } = createServiceDto;

    await this.servicesRepository.checkIsExist(name, companyId);

    const createServiceObj = (
      createServiceDto: CreateServiceDto
    ): DeepPartial<Service> => {
      const { name, duration, price, category } = createServiceDto;

      const newServiceData: DeepPartial<Service> = {
        company: { id: companyId } as Company,
        category: { id: category } as Category,
        name,
        duration,
        price,
      };

      if (createServiceDto.avatar) {
        newServiceData.avatar = createServiceDto.avatar;
      }

      if (createServiceDto.break) {
        newServiceData.break = createServiceDto.break;
      }

      if (createServiceDto.desc) {
        newServiceData.desc = createServiceDto.desc;
      }

      if (createServiceDto.images && createServiceDto.images.length) {
        newServiceData.images = createServiceDto.images;
      }

      if (createServiceDto.employees) {
        newServiceData.employees = createServiceDto.employees.map(id => ({
          id,
        })) as Employee[];
      }

      if (createServiceDto.resources) {
        newServiceData.resources = createServiceDto.resources.map(id => ({
          id,
        })) as Resource[];
      }

      return { ...newServiceData };
    };

    const newService = this.servicesRepository.create(
      createServiceObj(createServiceDto)
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
