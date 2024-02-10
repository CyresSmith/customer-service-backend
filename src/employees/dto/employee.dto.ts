import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { JobTitle, Role } from 'src/common/types';

export class EmployeeDto {
  @IsString()
  jobTitle: JobTitle;

  // @IsNumber()
  // category: number;

  @IsBoolean()
  provider: boolean;

  @IsOptional()
  role: Role;
}
