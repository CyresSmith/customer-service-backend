import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsPassword } from 'src/common/validators';

export class RestorePasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsPassword()
  password: string;

  @IsString()
  @Length(8, 8)
  verificationCode: string;
}
