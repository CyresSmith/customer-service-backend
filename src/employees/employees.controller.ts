import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CreateExistUserEmployeeDto } from './dto/create-exist-user-employee.dto';
import { Employee } from 'db/entities';
import { IBasicEmployeeInfo } from './employees.types';
import { UsersRepository } from 'src/common/repositories';
import { UsersService } from 'src/users/users.service';
import { IUserData } from 'src/users/users.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly userRepository: UsersRepository,
    private readonly userService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ============================================ Get one

  @UseGuards(AccessTokenGuard)
  @Get('get-one/:id')
  @HttpCode(200)
  async getOne(
    @Param('id') id: number,
    @Query('companyId') companyId: number
  ): Promise<Employee> {
    return await this.employeesService.getOne(companyId, id);
  }

  // ============================================ Get all employees from Company

  @UseGuards(AccessTokenGuard)
  @Get('get-all-from-company')
  @HttpCode(200)
  async getAllFromCompany(
    @Query('companyId') companyId: number
  ): Promise<Employee[]> {
    return this.employeesService.getAllFromCompany(companyId);
  }

  // ============================================ Add exist user employee

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('add-exist-user-employee')
  @HttpCode(200)
  async addExistUserEmployee(
    @Query('companyId') companyId: number,
    @Body() createEmployeeDto: CreateExistUserEmployeeDto
  ): Promise<Employee> {
    const { userId, employeeData } = createEmployeeDto;

    return await this.employeesService.addExistUserEmployee(
      userId,
      employeeData,
      companyId
    );
  }

  // ============================================ Add new user employee

  @Roles(RolesEnum.OWNER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('add-new-user-employee')
  @HttpCode(200)
  async addEmployee(
    @Query('companyId') companyId: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<IBasicEmployeeInfo> {
    const { userData, employeeData } = createEmployeeDto;

    const existUser = await this.userRepository.checkIsExist(
      userData.email,
      userData.phone
    );

    if (existUser) {
      return await this.employeesService.addExistUserEmployee(
        existUser.id,
        employeeData,
        companyId
      );
    } else {
      const { user } = await this.userService.create(userData);

      return await this.employeesService.addNewUserEmployee(
        user.id,
        createEmployeeDto,
        companyId
      );
    }
  }

  // ============================================ Find employee data

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('find-employee-data')
  @HttpCode(200)
  async findEmployeeData(
    @Query('companyId') companyId: number,
    @Body() { email }: { email: string }
  ): Promise<IUserData> {
    await this.employeesService.checkIsEmployeeExist(email, companyId);
    return await this.userService.getUserDataByEmail(email);
  }

  // ============================================ Update employee avatar

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('update/:employeeId/avatar')
  @HttpCode(200)
  async updateEmployeeAvatar(
    @Query('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    await this.employeesService.checkCompanyEmployee(companyId, employeeId);

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
  @Patch('update/:employeeId')
  @HttpCode(200)
  async updateEmployeeData(
    @Query('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Body() data: UpdateEmployeeProfileDto
  ): Promise<Employee> {
    await this.employeesService.checkCompanyEmployee(companyId, employeeId);

    await this.employeesService.updateProfile(employeeId, data);

    return await this.employeesService.getOne(companyId, employeeId);
  }

  // ==================================================================

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeesService.create(createEmployeeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.employeesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto
  // ) {
  //   return this.employeesService.update(+id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeesService.remove(+id);
  // }
}
