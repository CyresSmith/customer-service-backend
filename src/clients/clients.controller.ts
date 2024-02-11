import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  ConflictException,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
// import { UpdateClientDto } from './dto/update-client.dto';
import { AccessTokenGuard } from 'src/common/guards';
import { Client } from 'db/entities';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  @Post(':companyId/create')
  async create(
    @Body() createClientDto: CreateClientDto,
    @Param('companyId') companyId: number
  ): Promise<Client> {
    const isExist = await this.clientsService.findByPhone(
      companyId,
      createClientDto?.phone
    );

    if (isExist) {
      throw new ConflictException(
        `Client with phone number ${createClientDto.phone} already exist`
      );
    }

    return await this.clientsService.create(createClientDto, companyId);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Get(':companyId/get-all')
  async findAll(@Param('companyId') companyId: number): Promise<Client[]> {
    return await this.clientsService.findAll(companyId);
  }

  @Get(':companyId/:id')
  async findById(
    @Param('companyId' && 'id') companyId: number,
    id: number
  ): Promise<Client> {
    return await this.clientsService.findById(companyId, id);
  }

  @Get(':companyId/:phone')
  async findByPhone(
    @Param('companyId' && 'phone') companyId: number,
    phone: string
  ): Promise<Client> {
    return await this.clientsService.findByPhone(companyId, phone);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(+id, updateClientDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
