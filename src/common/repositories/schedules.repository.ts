import { BadRequestException, Injectable } from '@nestjs/common';
import { Schedule } from 'db/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SchedulesRepository extends Repository<Schedule> {
  constructor(private readonly ds: DataSource) {
    super(Schedule, ds.createEntityManager());
  }

  // ============================================ Check is exist

  async checkIsExist(scheduleId: number): Promise<boolean> {
    const isExist = await this.findOneBy({ id: scheduleId });

    if (!isExist) {
      throw new BadRequestException('Графіка не існує');
    }

    return false;
  }

  // ============================================ Get Employee schedules

  getEmployeeSchedules(
    employeeId: number,
    companyId: number
  ): Promise<Schedule[]> {
    return this.find({
      where: {
        employee: { id: employeeId },
        company: { id: companyId },
        type: 'employee',
      },
      select: ['id', 'year', 'month', 'schedule'],
    });
  }
}
