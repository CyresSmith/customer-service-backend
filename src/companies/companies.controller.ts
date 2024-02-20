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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Activity, Company, Employee } from 'db/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UsersRepository } from 'src/common/repositories';
import { MessageResponse } from 'src/common/types';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { CreateExistUserEmployeeDto } from 'src/employees/dto/create-exist-user-employee.dto';
import { UpdateEmployeeProfileDto } from 'src/employees/dto/update-employee-profile.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { IBasicEmployeeInfo } from 'src/employees/employees.types';
import { SchedulesService } from 'src/schedules/schedules.service';
import { UsersService } from 'src/users/users.service';
import { IBasicUserInfo, IUserData } from 'src/users/users.types';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateEmployeeScheduleDto } from './dto/update-employee-schedule.dto';

@Controller('company')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly userService: UsersService,
    private readonly userRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly employeesService: EmployeesService,
    private readonly schedulesService: SchedulesService
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

  // ============================================ Add exist user employee

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/add-exist-user-employee')
  @HttpCode(200)
  async addExistUserEmployee(
    @Param('companyId') companyId: number,
    @Body() createEmployeeDto: CreateExistUserEmployeeDto
  ): Promise<Employee> {
    const { userId, employeeData } = createEmployeeDto;

    return await this.companiesService.addExistUserEmployee(
      userId,
      employeeData,
      companyId
    );
  }

  // ============================================ Add new user employee

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/add-new-user-employee')
  @HttpCode(200)
  async addEmployee(
    @Param('companyId') companyId: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<IBasicEmployeeInfo> {
    const { userData, employeeData } = createEmployeeDto;

    const existUser = await this.userRepository.checkIsExist(
      userData.email,
      userData.phone
    );

    if (existUser) {
      return await this.companiesService.addExistUserEmployee(
        existUser.id,
        employeeData,
        companyId
      );
    } else {
      const { user } = await this.userService.create(userData);

      return await this.companiesService.addNewUserEmployee(
        user.id,
        createEmployeeDto,
        companyId
      );
    }
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

  // ============================================ Find employee data

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/find-employee-data')
  @HttpCode(200)
  async findEmployeeData(
    @Param('companyId') companyId: number,
    @Body() { email }: { email: string }
  ): Promise<IUserData> {
    await this.companiesService.checkIsEmployeeExist(email, companyId);
    return await this.userService.getUserDataByEmail(email);
  }

  // ============================================ Update employee avatar

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch(':companyId/employee/:employeeId/avatar')
  @HttpCode(200)
  async updateEmployeeAvatar(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    await this.companiesService.checkCompanyEmployee(companyId, employeeId);

    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `company_${companyId}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.employeesService.updateProfile(employeeId, {
      avatar: url as string,
    });

    return { url };
  }

  // ============================================ Update employee profile

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':companyId/employee/:employeeId/profile')
  @HttpCode(200)
  async updateEmployeeData(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Body() data: UpdateEmployeeProfileDto
  ): Promise<MessageResponse> {
    await this.companiesService.checkCompanyEmployee(companyId, employeeId);

    await this.employeesService.updateProfile(employeeId, data);

    return { message: 'Профайл оновлено' };
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
    await this.companiesService.checkCompanyEmployee(companyId, employeeId);

    if (data?.scheduleId) {
      const { scheduleId } = data;

      await this.schedulesService.CheckIsExist(scheduleId);

      return await this.schedulesService.updateEmployeeSchedule({
        ...data,
        companyId,
        employeeId,
      });
    }

    const newSchedule = await this.schedulesService.createEmployeeSchedule({
      ...data,
      companyId,
      employeeId,
    });

    if (newSchedule) {
      return { message: 'Графік оновлено' };
    }
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
