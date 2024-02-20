import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Schedule } from 'db/entities';
import { SchedulesRepository } from 'src/common/repositories';
import {
  ICreateEmployeeSchedule,
  IUpdateEmployeeSchedule,
  MessageResponse,
} from 'src/common/types';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly schedulesRepository: SchedulesRepository) {}

  // ============================================ Check Is Exist

  async CheckIsExist(scheduleId: number): Promise<boolean> {
    return await this.schedulesRepository.checkIsExist(scheduleId);
  }

  // ============================================ Create Employee Schedule

  async createEmployeeSchedule(
    employeeScheduleDto: ICreateEmployeeSchedule
  ): Promise<Schedule> {
    const { companyId, employeeId, ...rest } = employeeScheduleDto;

    const newSchedule = this.schedulesRepository.create({
      ...rest,
      type: 'employee',
      company: { id: companyId },
      employee: { id: employeeId },
    });
    return await this.schedulesRepository.save(newSchedule);
  }

  // ============================================ Update Employee Schedule

  async updateEmployeeSchedule(
    employeeScheduleDto: IUpdateEmployeeSchedule
  ): Promise<MessageResponse> {
    const { scheduleId, ...rest } = employeeScheduleDto;

    await this.schedulesRepository.checkIsExist(scheduleId);

    try {
      await this.schedulesRepository.update({ id: scheduleId }, rest);

      return { message: 'Графік оновлено' };
    } catch (error) {
      throw new MethodNotAllowedException(error);
    }
  }

  // ============================================ Update Employee Schedule

  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedules`;
  }

  async findOne(id: number, companyId: number): Promise<Schedule> {
    return await this.schedulesRepository.findOneBy({
      id,
      company: { id: companyId },
      type: 'employee',
    });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
