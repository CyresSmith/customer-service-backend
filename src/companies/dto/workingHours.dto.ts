import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ISchedule } from 'src/common/types';

export class ScheduleDto {
  @IsString()
  @Length(5, 5)
  to: string;

  @IsString()
  @Length(5, 5)
  from: string;
}

export class WorkingHoursDto {
  @ValidateNested()
  @Type(() => ScheduleDto)
  hours: ISchedule;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  days: number[];
}
