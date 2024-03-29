import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { UpdateEmployeeScheduleDto } from 'src/companies/dto/update-employee-schedule.dto';
import { MessageResponse } from 'src/common/types';
import { EmployeesService } from 'src/employees/employees.service';
import { Schedule } from 'db/entities';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly employeesService: EmployeesService
  ) {}

  // ============================================ Get Company schedules

  @UseGuards(AccessTokenGuard)
  @Get('get-all')
  @HttpCode(200)
  async getAllSchedules(
    @Query('companyId') companyId: number,
    @Query('year') year: number,
    @Query('month') month: number
  ): Promise<Schedule[]> {
    return await this.schedulesService.getAllSchedules(companyId, year, month);
  }
  // ============================================ Update employee schedule

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':employeeId/update')
  @HttpCode(200)
  async updateEmployeeSchedule(
    @Query('companyId') companyId: number,
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
  @Get(':employeeId/get-one')
  @HttpCode(200)
  async getEmployeeSchedule(
    @Param('employeeId') employeeId: number,
    @Query('companyId') companyId: number,
    @Query('year') year: number,
    @Query('month') month: number
  ): Promise<Schedule | null> {
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
  @Delete(':scheduleId/employee/:employeeId/delete')
  @HttpCode(200)
  async deleteEmployeeSchedule(
    @Query('companyId') companyId: number,
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

  // ==========================================================

  // @Post()
  // create(@Body() createScheduleDto: CreateScheduleDto) {
  //   return this.schedulesService.create(createScheduleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.schedulesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.schedulesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateScheduleDto: UpdateScheduleDto
  // ) {
  //   return this.schedulesService.update(+id, updateScheduleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schedulesService.remove(+id);
  // }
}
