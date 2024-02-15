import { Injectable } from '@nestjs/common';
import { ClientsRepository } from 'src/common/repositories';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from 'db/entities';
import { UpdateClientDto } from './dto/update-client.dto';

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

    return await this.findById(companyId, id);
  }

  async findAll(companyId: number): Promise<Client[]> {
    return this.clientsRepository.find({
      where: {
        company: { id: companyId },
      },
    });
  }

  async findById(companyId: number, id: number): Promise<Client> {
    return await this.clientsRepository.getById(companyId, id);
  }

  async findByPhone(companyId: number, phone: string): Promise<Client> {
    return await this.clientsRepository.getByPhone(companyId, phone);
  }

  async uploadAvatar(id: number, data: { avatar: string }) {
    return await this.clientsRepository.update(id, data);
  }

  async updateClient(
    companyId: number,
    id: number,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    await this.clientsRepository.update(id, updateClientDto);
    return await this.findById(companyId, id);
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
