import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { EmployeeDto } from './employee.dto';

export class CreateExistUserEmployeeDto {
    @IsNumber()
    userId: number;

    @ValidateNested()
    @Type(() => EmployeeDto)
    employeeData: EmployeeDto;
}
