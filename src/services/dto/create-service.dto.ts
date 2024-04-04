import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';
import { EmployeesServiceSettings, ServiceType } from 'src/common/types';
import { EmployeesServiceSettingsDto } from './employees-service-settings.dto';

export class CreateServiceDto {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsNumber()
    @IsDefined()
    duration: number;

    @IsNumber()
    @IsOptional()
    break: number;

    @IsNumber()
    @IsDefined()
    price: number;

    @IsOptional()
    @IsString()
    @Length(30, 1000)
    desc: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => EmployeesServiceSettingsDto)
    employeesSettings: EmployeesServiceSettings[];

    @IsArray()
    @IsOptional()
    images: string[];

    @IsNumber()
    @IsDefined()
    category: number;

    @IsOptional()
    @IsArray()
    employees?: number[];

    @IsArray()
    @IsOptional()
    resources?: number[];

    @IsString()
    @IsDefined()
    type: ServiceType;

    @IsOptional()
    @IsNumber()
    @IsDefined()
    capacity: number;

    @IsOptional()
    @IsNumber()
    @IsDefined()
    placeLimit: number;
}
