import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { JobTitle } from 'src/common/types';

export class EmployeeDto {
  @IsString()
  jobTitle: JobTitle;

  @IsNumber()
  category: number;

  @IsBoolean()
  provider: boolean;
}
