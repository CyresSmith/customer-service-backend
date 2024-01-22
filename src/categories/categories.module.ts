import { Module } from '@nestjs/common';
import {
  CategoriesRepository,
  CompaniesRepository,
} from 'src/common/repositories';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, CompaniesRepository],
})
export class CategoriesModule {}
