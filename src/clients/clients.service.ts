import { Injectable } from '@nestjs/common';
import { ClientsRepository } from 'src/common/repositories';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from 'db/entities';
// import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(
    createClientDto: CreateClientDto,
    companyId: number
  ): Promise<Client> {
    const { id } = await this.clientsRepository.save({
      ...createClientDto,
      company: { id: companyId },
    });

    return await this.findById(id, companyId);
  }

  async findAll(companyId: number): Promise<Client[]> {
    return this.clientsRepository.find({
      where: {
        company: { id: companyId },
      },
    });
  }

  async findById(id: number, companyId: number): Promise<Client> {
    return this.clientsRepository.getById(companyId, id);
  }

  async findByPhone(companyId: number, phone: string): Promise<Client> {
    return this.clientsRepository.getByPhone(companyId, phone);
  }

  // update(id: number, updateClientDto: UpdateClientDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
