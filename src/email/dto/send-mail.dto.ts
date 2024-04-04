import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SendMailDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    to: string;

    @IsString({ message: 'Subject must be a string' })
    @MinLength(3, { message: 'Min length 3' })
    @MaxLength(50, { message: 'Max length 50' })
    @IsNotEmpty({ message: 'Subject is required' })
    subject: string;

    @IsString({ message: 'Subject must be a string' })
    @MinLength(3, { message: 'Min length 3' })
    @MaxLength(1000, { message: 'Max length 1000' })
    @IsNotEmpty({ message: 'Subject is required' })
    html: string;
}
