import { Category } from '@domain/models';

export type CreateCategoryDto = Omit<
  Category,
  'id' | 'slug' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
