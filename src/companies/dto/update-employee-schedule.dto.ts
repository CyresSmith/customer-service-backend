import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { ISchedule, IWorkSchedule } from 'src/common/types';
import { ScheduleDto } from './workingHours.dto';

export class ScheduleHoursAndDatesDto {
  @ValidateNested()
  @Type(() => ScheduleDto)
  hours: ISchedule;

  @IsArray()
  @ArrayMaxSize(31)
  @IsNumber({ allowNaN: false }, { each: true })
  days: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleDto)
  break: ISchedule;
}

const date = new Date(Date.now());
const year = date.getFullYear();
const month = date.getMonth();

export class UpdateEmployeeScheduleDto {
  @IsOptional()
  @IsNumber()
  @IsDefined()
  scheduleId: number;

  @IsNumber()
  @IsDefined()
  @Min(year)
  year: number;

  @IsNumber()
  @IsDefined()
  @Min(month)
  month: number;

  @ValidateNested()
  @Type(() => ScheduleHoursAndDatesDto)
  schedule: IWorkSchedule;
}
