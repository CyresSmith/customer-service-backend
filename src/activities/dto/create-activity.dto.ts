import { IsNumber, IsString, Length } from 'class-validator';

export class CreateActivityDto {
    @IsString()
    @Length(3, 30)
    name: string;

    @IsNumber()
    categoryId: number;
}
