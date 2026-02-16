import { Brand } from '@models/index';

export type CreateBrandDto = Omit<
  Brand,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateBrandDto = Partial<CreateBrandDto>;
