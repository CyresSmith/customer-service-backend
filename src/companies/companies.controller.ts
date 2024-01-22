import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Company } from 'db/entities';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { IBasicUserInfo } from 'src/users/users.types';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // ============================================ Register company

  @UseGuards(AccessTokenGuard)
  @Post('register')
  @HttpCode(201)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<Company> {
    return await this.companiesService.create(createCompanyDto, user.id);
  }

  // ============================================

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
