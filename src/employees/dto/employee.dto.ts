import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { JobTitle, Role } from 'src/common/types';

export class EmployeeDto {
    @IsString()
    jobTitle: JobTitle;

    @IsBoolean()
    provider: boolean;

    @IsOptional()
    role: Role;
}
