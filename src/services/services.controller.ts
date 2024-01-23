import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Service } from 'db/entities';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('service')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // ============================================ Create new service

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('company/:companyId')
  async create(
    @Param('companyId') companyId: number,
    @Body() createServiceDto: CreateServiceDto
  ): Promise<Service> {
    return await this.servicesService.create(createServiceDto, companyId);
  }

  // ============================================

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
