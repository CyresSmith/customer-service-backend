import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ISchedule, MonthSchedule } from 'src/common/types';
import { ScheduleDto } from './workingHours.dto';

export class ScheduleDayDto {
  @ValidateNested()
  @Type(() => ScheduleDto)
  hours: ISchedule;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleDto)
  breakHours: ISchedule;

  @Max(31)
  @IsNumber({ allowNaN: false })
  day: number;
}

const date = new Date(Date.now());
const year = date.getFullYear();
const month = date.getMonth();

export class UpdateEmployeeScheduleDto {
  @IsOptional()
  @IsNumber()
  @IsDefined()
  id: number;

  @IsNumber()
  @IsDefined()
  @Min(year)
  year: number;

  @IsNumber()
  @IsDefined()
  @Min(month)
  month: number;

  @ValidateNested()
  @Type(() => ScheduleDayDto)
  schedule: MonthSchedule;
}
