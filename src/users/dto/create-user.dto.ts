import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPassword } from 'src/common/validators';

const passwordRegExp = /^(?=.*[A-Z])(?=.*\d).{6,20}$/;

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsPassword()
  password: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  @IsOptional()
  lastName: string;
}
