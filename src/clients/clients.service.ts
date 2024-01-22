import { Injectable } from '@nestjs/common';
import { ClientsRepository } from 'src/common/repositories';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return this.clientsRepository.getById(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
