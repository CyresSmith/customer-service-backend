import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  ConflictException,
  UseInterceptors,
  UploadedFile,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AccessTokenGuard } from 'src/common/guards';
import { Client } from 'db/entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ================================= Create Client

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

  // ================================= Get all company Clients

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Get(':companyId/get-all')
  async findAll(@Param('companyId') companyId: number): Promise<Client[]> {
    return await this.clientsService.findAll(companyId);
  }

  // ================================= Get company Client by id

  @Get(':companyId/:id')
  async findById(
    @Param('companyId') companyId: number,
    @Param('id') id: number
  ): Promise<Client> {
    return await this.clientsService.findById(companyId, id);
  }

  // ================================= Get company Client by phone

  @Get(':companyId/:phone')
  async findByPhone(
    @Param('companyId') companyId: number,
    @Param('phone') phone: string
  ): Promise<Client> {
    return await this.clientsService.findByPhone(companyId, phone);
  }

  // ================================== Update Client

  @UseGuards(AccessTokenGuard)
  @Patch(':companyId/:id/update')
  async update(
    @Param('companyId') companyId: number,
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto
  ): Promise<Client> {
    const isClient = await this.clientsService.findById(companyId, id);
    if (!isClient) {
      throw new BadRequestException(
        `Клієнта з id ${id} не знайдено в компанії з id ${companyId}`
      );
    }

    return await this.clientsService.updateClient(
      companyId,
      id,
      updateClientDto
    );
  }

  // ================================== Update Client`s avatar

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post(':companyId/:id/update/avatar')
  async updateAvatar(
    @Param('id') id: number,
    @Param('companyId') companyId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    const isClient = await this.clientsService.findById(companyId, id);
    if (!isClient) {
      throw new BadRequestException(
        `Клієнта з id ${id} не знайдено в компанії з id ${companyId}`
      );
    }

    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `client_${id}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.clientsService.uploadAvatar(id, {
      avatar: url,
    });

    return { url };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
