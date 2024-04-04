import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/validators';

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsPassword()
    password: string;
}
