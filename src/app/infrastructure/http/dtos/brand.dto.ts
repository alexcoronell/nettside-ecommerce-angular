import { Brand } from '@domain/models';

export type CreateBrandDto = Omit<
  Brand,
  'id' | 'slug' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateBrandDto = Partial<CreateBrandDto>;
