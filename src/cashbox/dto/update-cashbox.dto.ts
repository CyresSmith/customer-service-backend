import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateCashboxDto } from './create-cashbox.dto';

export class UpdateCashboxDto extends PartialType(OmitType(CreateCashboxDto, ['balance'])) {
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
