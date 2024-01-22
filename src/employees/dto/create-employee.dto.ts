import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmployeeDto } from './employee.dto';

export class CreateEmployeeDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  userData: CreateUserDto;

  @ValidateNested()
  @Type(() => EmployeeDto)
  employeeData: EmployeeDto;
}
