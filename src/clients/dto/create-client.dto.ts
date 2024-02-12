import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/types';
import { phoneRegExp } from 'src/common/validators/phone-array.validator';

export class CreateClientDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email: string;

  @Matches(phoneRegExp, { message: 'Invalid phone number' })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @MinLength(3, { message: 'Min length 3' })
  @MaxLength(20, { message: 'Max length 20' })
  @IsOptional()
  lastName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  birthday: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  gender: Gender;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  discount: number;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  comment: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  avatar: string;
}
