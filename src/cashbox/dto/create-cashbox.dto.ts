import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateCashboxDto {
    @IsString()
    @Length(3, 20)
    name: string;

    @IsNumber()
    balance: number;

    @IsNumber()
    responsible: number;

    @IsOptional()
    @IsString()
    @Length(10, 150)
    comment: string;
}
