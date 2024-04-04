import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Schedule } from 'db/entities';
import { SchedulesRepository } from 'src/common/repositories';
import { ICreateEmployeeSchedule, MessageResponse, MonthSchedule } from 'src/common/types';
import { MoreThanOrEqual } from 'typeorm';
// import { CreateScheduleDto } from './dto/create-schedule.dto';
// import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
    constructor(private readonly schedulesRepository: SchedulesRepository) {}

    // ============================================ Check Is Exist

    async CheckIsExist(scheduleId: number): Promise<boolean> {
        return await this.schedulesRepository.checkIsExist(scheduleId);
    }

    // ============================================ Create Employee Schedule

    async createEmployeeSchedule(employeeScheduleDto: ICreateEmployeeSchedule): Promise<Schedule> {
        const { companyId, employeeId, ...rest } = employeeScheduleDto;

        const newSchedule = this.schedulesRepository.create({
            ...rest,
            type: 'employee',
            company: { id: companyId },
            employee: { id: employeeId },
        });

        return await this.schedulesRepository.save(newSchedule);
    }

    // ============================================ Update Schedule by id

    async updateScheduleById(id: number, schedule: MonthSchedule): Promise<MessageResponse> {
        await this.schedulesRepository.checkIsExist(id);

        try {
            await this.schedulesRepository.update({ id }, { schedule });

            return { message: 'Графік оновлено' };
        } catch (error) {
            throw new MethodNotAllowedException(error);
        }
    }

    // ============================================ Get Employee Schedule

    async getEmployeeSchedule(
        companyId: number,
        employeeId: number,
        year: number,
        month: number
    ): Promise<Schedule> {
        return await this.schedulesRepository.findOne({
            where: {
                employee: { id: employeeId },
                company: { id: companyId },
                type: 'employee',
                year,
                month,
            },
            select: {
                id: true,
                employee: { id: true },
                year: true,
                month: true,
                schedule: {
                    hours: { from: true, to: true },
                    breakHours: { from: true, to: true },
                    day: true,
                },
            },
        });
    }

    // ============================================ Get Company schedules

    async getAllSchedules(companyId: number, year: number, month: number): Promise<Schedule[]> {
        return await this.schedulesRepository.find({
            relations: ['employee'],
            where: {
                company: { id: companyId },
                type: 'employee',
                year,
                month,
            },
            select: {
                id: true,
                year: true,
                month: true,
                employee: { id: true },
                schedule: {
                    hours: { from: true, to: true },
                    breakHours: { from: true, to: true },
                    day: true,
                },
            },
        });
    }

    // ============================================ Delete Employee Schedule

    async deleteScheduleById(
        id: number,
        companyId: number,
        employeeId: number
    ): Promise<MessageResponse> {
        await this.schedulesRepository.checkIsExist(id);

        try {
            await this.schedulesRepository.delete({
                id,
                company: { id: companyId },
                employee: { id: employeeId },
            });

            return { message: 'Графік видалено' };
        } catch (error) {
            throw new MethodNotAllowedException(error);
        }
    }

    // ============================================ Get All Company Schedules From Current Month

    async getAllCompanySchedulesFromCurrentMonth(companyId: number): Promise<Schedule[]> {
        const currentMonth = new Date(Date.now()).getMonth();

        return await this.schedulesRepository.find({
            where: {
                company: { id: companyId },
                month: MoreThanOrEqual(currentMonth),
            },
            select: {
                id: true,
                year: true,
                month: true,
                schedule: {
                    hours: { from: true, to: true },
                    breakHours: { from: true, to: true },
                    day: true,
                },
            },
        });
    }

    // ============================================

    // create(createScheduleDto: CreateScheduleDto) {
    //   return 'This action adds a new schedule';
    // }

    // findAll() {
    //   return `This action returns all schedules`;
    // }

    // async findOne(id: number, companyId: number): Promise<Schedule> {
    //   return await this.schedulesRepository.findOneBy({
    //     id,
    //     company: { id: companyId },
    //     type: 'employee',
    //   });
    // }

    // update(id: number, updateScheduleDto: UpdateScheduleDto) {
    //   return `This action updates a #${id} schedule`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} schedule`;
    // }
}
