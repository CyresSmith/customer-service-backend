import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { IWorkTime, IWorkingHours } from 'src/common/types';
import { WorkTimeDto } from './work-time.dto';

export class WorkingHoursDto implements IWorkingHours {
  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  monday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  tuesday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  wednesday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  thursday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  friday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  saturday: IWorkTime;

  @ValidateNested()
  @Type(() => WorkTimeDto)
  @IsDefined()
  sunday: IWorkTime;
}
