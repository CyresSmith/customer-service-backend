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
import { Company, Employee } from 'db/entities';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UsersRepository } from 'src/common/repositories';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { UsersService } from 'src/users/users.service';
import { IBasicUserInfo } from 'src/users/users.types';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly userService: UsersService,
    private readonly userRepository: UsersRepository
  ) {}

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

  // ============================================ Add employee

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/add-employee')
  @HttpCode(200)
  async addEmployee(
    @Param('companyId') companyId: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<Employee> {
    const { userData, employeeData } = createEmployeeDto;

    const existUserId = await this.userRepository.isExistCheck(
      userData.email,
      userData.phone
    );

    if (existUserId) {
      return await this.companiesService.addExistUserEmployee(
        existUserId,
        employeeData,
        companyId
      );
    } else {
      const { user: newUser } = await this.userService.create(userData);

      return await this.companiesService.addNewUserEmployee(
        newUser,
        employeeData,
        companyId
      );
    }
  }

  // ============================================ Get Company by id

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companiesService.findOne(id);
  }

  // ============================================

  @Get()
  findAll() {
    return this.companiesService.findAll();
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
