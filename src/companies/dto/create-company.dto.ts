import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayValidPhone } from 'src/common/validators/phone-array.validator';

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

  @IsNumber()
  @IsNotEmpty({ message: 'Category is required' })
  category: number;
}
