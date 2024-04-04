import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Code is required' })
    code: string;
}
