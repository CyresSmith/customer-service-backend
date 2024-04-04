import { IsString, Length } from 'class-validator';
import { CategoryType } from 'src/common/types';

export class CreateCategoryDto {
    @IsString()
    @Length(3, 20)
    name: string;

    @IsString()
    type: CategoryType;
}
