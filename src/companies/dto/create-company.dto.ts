import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IWorkingHours } from 'src/common/types';
import { IsArrayValidPhone } from 'src/common/validators/phone-array.validator';
import { WorkingHoursDto } from './working-hours.dto';

export class CreateCompanyDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(30, { message: 'Max length 30' })
  name: string;

  @IsArrayValidPhone({ message: 'Invalid phone numbers array' })
  @IsArray({ message: 'Phone numbers must be an array' })
  @IsNotEmpty({ message: 'Phones is required' })
  phones: string[];

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Working hours is required' })
  @ValidateNested()
  @Type(() => WorkingHoursDto)
  workingHours: IWorkingHours;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Min length 10' })
  @MaxLength(1000, { message: 'Max length 1000' })
  desc: string;
}
