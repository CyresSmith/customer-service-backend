import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class EmployeesServiceSettingsDto {
  @IsNumber()
  employeeId: number;

  @IsOptional()
  @IsNumber()
  @IsDefined()
  duration: number;

  @IsOptional()
  @IsNumber()
  @IsDefined()
  price: number;
}
