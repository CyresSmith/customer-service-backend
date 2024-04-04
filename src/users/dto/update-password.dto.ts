import { IsPassword } from 'src/common/validators';

export class UpdatePasswordDto {
    @IsPassword()
    password: string;

    @IsPassword()
    newPassword: string;
}
