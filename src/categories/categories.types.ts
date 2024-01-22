import { Category } from 'db/entities';

export interface IBasicCategoryInfo
  extends Pick<Category, 'id' | 'name' | 'type'> {}
