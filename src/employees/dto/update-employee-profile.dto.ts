import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmployeeStatus, Gender, JobTitle, Role } from 'src/common/types';
import { phoneRegExp } from 'src/common/validators/phone-array.validator';

export class EmployeeProfileDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsOptional()
  email: string;

  @Matches(phoneRegExp, { message: 'Invalid phone number' })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsOptional()
  phone: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  @IsOptional()
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  @IsOptional()
  lastName: string;

  @IsString({ message: 'Last name must be a string' })
  @MinLength(10, { message: 'Min length 10' })
  @MaxLength(1000, { message: 'Max length 1000' })
  @IsOptional()
  info: string;

  @IsString({ message: 'Avatar must be a string' })
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  jobTitle: JobTitle;

  @IsBoolean()
  @IsOptional()
  provider: boolean;

  @IsOptional()
  role: Role;

  @IsOptional()
  status: EmployeeStatus;

  @IsDateString()
  @IsOptional()
  birthday: string;

  @IsOptional()
  gender: Gender;
}

export class UpdateEmployeeProfileDto extends PartialType(EmployeeProfileDto) {}
