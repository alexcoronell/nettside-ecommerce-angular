import { Category } from '@models/index';

export type CreateCategoryDto = Omit<
  Category,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
