import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class TokenPayloadDto {
    @IsNotEmpty({ message: 'User ID is required' })
    id: number;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsPhoneNumber('UA', { message: 'Invalid phone number format' })
    @IsNotEmpty({ message: 'Phone is required' })
    phone: string;

    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @IsString({ message: 'Last name must be a string' })
    @IsOptional()
    lastName: string;
}
