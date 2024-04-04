import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Branches, EmployeesCount, IWorkSchedule } from 'src/common/types';
import { IsArrayValidPhone } from 'src/common/validators/phone-array.validator';
import { WorkingHoursDto } from './workingHours.dto';

export class UpdateCompanyProfileDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Min length 3' })
    @MaxLength(30, { message: 'Max length 30' })
    @IsOptional()
    name?: string;

    @IsArrayValidPhone({ message: 'Invalid phone numbers array' })
    @IsArray({ message: 'Phone numbers must be an array' })
    @IsNotEmpty({ message: 'Phones is required' })
    @IsOptional()
    phones?: string[];

    @IsString({ message: 'Address must be a string' })
    @IsNotEmpty({ message: 'Address is required' })
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Category is required' })
    @IsOptional()
    category?: number;

    @IsArray()
    @IsNotEmpty({ message: 'Activities is required' })
    @IsOptional()
    activities?: number[];

    @IsString()
    @IsNotEmpty({ message: 'Employees count is required' })
    @IsOptional()
    employeesCount?: EmployeesCount;

    @IsString()
    @IsNotEmpty({ message: 'Branches is required' })
    @IsOptional()
    branches?: Branches;

    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    @MinLength(30, { message: 'Min length 30' })
    @MaxLength(1000, { message: 'Max length 1000' })
    @IsOptional()
    desc?: string;

    @ValidateNested()
    @Type(() => WorkingHoursDto)
    @IsOptional()
    workingHours?: IWorkSchedule[];
}
