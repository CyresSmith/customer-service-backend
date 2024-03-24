import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Activity,
  Company,
  Employee,
  Resource,
  Schedule,
  Service,
  ServiceCategory,
} from 'db/entities';
import { CategoriesService } from 'src/categories/categories.service';
import { IBasicServiceCategoryInfo } from 'src/categories/categories.types';
import { CreateServiceCategoryDto } from 'src/categories/dto/create-service-category.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import {
  IBasicServiceInfo,
  MessageResponse,
  ServiceDataType,
} from 'src/common/types';
import { SchedulesService } from 'src/schedules/schedules.service';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { UpdateServiceDto } from 'src/services/dto/update-service.dto';
import { ServicesService } from 'src/services/services.service';
import { IBasicUserInfo } from 'src/users/users.types';
import { CompaniesService } from './companies.service';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateEmployeeScheduleDto } from './dto/update-employee-schedule.dto';

@Controller('company')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly servicesService: ServicesService,
    private readonly categoriesService: CategoriesService,
    private readonly schedulesService: SchedulesService,
    private readonly employeesService: EmployeesService
  ) {}

  // ============================================ Register company

  @UseGuards(AccessTokenGuard)
  @Post('register')
  @HttpCode(201)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<Partial<Company>> {
    return await this.companiesService.create(createCompanyDto, user.id);
  }

  // ============================================ Get Company by id

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId')
  @HttpCode(200)
  findOne(@Param('companyId') companyId: number) {
    return this.companiesService.findOne(companyId);
  }

  // ============================================ Get company profile

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/profile')
  @HttpCode(200)
  async getProfile(@Param('companyId') companyId: number): Promise<Company> {
    return await this.companiesService.getProfile(companyId);
  }

  // ============================================ Get company Activities

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/activities')
  @HttpCode(200)
  async getActivities(
    @Param('companyId') companyId: number
  ): Promise<Activity[]> {
    return await this.companiesService.getActivities(companyId);
  }

  // ============================================ Update company avatar

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post(':companyId/profile/avatar')
  @HttpCode(200)
  async updateAvatar(
    @Param('companyId') companyId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `company_${companyId}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.companiesService.updateAvatar(companyId, {
      avatar: url,
    });

    return { url };
  }

  // ============================================ Update company profile

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':companyId/profile')
  @HttpCode(200)
  async updateProfile(
    @Param('companyId') companyId: number,
    @Body() data: UpdateCompanyProfileDto
  ): Promise<MessageResponse> {
    await this.companiesService.updateProfile(companyId, data);

    return { message: 'Successfully updated' };
  }

  // ============================================ Update employee schedule

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':companyId/employee/:employeeId/schedule')
  @HttpCode(200)
  async updateEmployeeSchedule(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Body() data: UpdateEmployeeScheduleDto
  ): Promise<MessageResponse> {
    await this.employeesService.checkCompanyEmployee(companyId, employeeId);

    const existSchedule = await this.schedulesService.getEmployeeSchedule(
      companyId,
      employeeId,
      data?.year,
      data?.month
    );

    if (existSchedule) {
      await this.schedulesService.updateScheduleById(
        existSchedule.id,
        data.schedule
      );
    } else {
      await this.schedulesService.createEmployeeSchedule({
        ...data,
        companyId,
        employeeId,
      });
    }

    return { message: 'Графік оновлено' };
  }

  // ============================================ Get employee schedule

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/employee/:employeeId/schedule')
  @HttpCode(200)
  async getEmployeeSchedule(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Query('year') year: number,
    @Query('month') month: number
  ): Promise<Schedule> {
    await this.employeesService.checkCompanyEmployee(companyId, employeeId);

    return await this.schedulesService.getEmployeeSchedule(
      companyId,
      employeeId,
      year,
      month
    );
  }

  // ============================================ Delete employee schedule

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':companyId/employee/:employeeId/schedule/:scheduleId')
  @HttpCode(200)
  async deleteEmployeeSchedule(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Param('scheduleId') scheduleId: number
  ): Promise<MessageResponse> {
    await this.employeesService.checkCompanyEmployee(companyId, employeeId);

    await this.schedulesService.deleteScheduleById(
      scheduleId,
      companyId,
      employeeId
    );

    return { message: 'Графік оновлено' };
  }

  // ============================================

  // @Get()
  // findAll() {
  //   return this.companiesService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companiesService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companiesService.remove(+id);
  // }
}
