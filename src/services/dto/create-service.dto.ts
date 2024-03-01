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
  @Length(3, 20)
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

  @IsString()
  @Length(10, 1000)
  @IsOptional()
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
}
