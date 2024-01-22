import { IsDefined, IsNumber } from 'class-validator';
import { IWorkTime } from 'src/common/types';

export class WorkTimeDto implements IWorkTime {
  @IsNumber()
  @IsDefined()
  from: number;

  @IsNumber()
  @IsDefined()
  to: number;
}
