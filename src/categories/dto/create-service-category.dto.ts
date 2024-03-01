import { IsDefined, IsString, Length } from 'class-validator';
import { ServiceType } from 'src/common/types';

export class CreateServiceCategoryDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsDefined()
  type: ServiceType;
}
