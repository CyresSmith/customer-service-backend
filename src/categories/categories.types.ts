import { Category, ServiceCategory } from 'db/entities';

export interface IBasicCategoryInfo
  extends Pick<Category, 'id' | 'name' | 'type'> {}

export interface ICompanyCategoryInfo
  extends Pick<Category, 'id' | 'name' | 'activities'> {}

export interface IBasicServiceCategoryInfo
  extends Pick<ServiceCategory, 'id' | 'name'> {}
