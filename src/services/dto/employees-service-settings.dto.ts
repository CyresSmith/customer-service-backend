import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class EmployeesServiceSettingsDto {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  @IsDefined()
  duration: number;

  @IsNumber()
  @IsDefined()
  price: number;

  @IsNumber()
  @IsOptional()
  break: number;
}
