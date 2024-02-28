import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsNumber()
  @IsDefined()
  duration: number;

  @IsNumber()
  @IsOptional()
  break: number;

  @IsNumber()
  @IsDefined()
  price: number;

  @IsString()
  @Length(10, 500)
  @IsOptional()
  desc: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsNumber()
  @IsDefined()
  category: number;

  @IsArray()
  @IsOptional()
  employees: number[];

  @IsArray()
  @IsOptional()
  resources: number[];
}
