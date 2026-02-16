import { Subcategory } from '@models/index';

export type CreateSubcategoryDto = Omit<
  Subcategory,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'category'
> & {
  category: number;
};

export type UpdateSubcategoryDto = Partial<CreateSubcategoryDto>;
