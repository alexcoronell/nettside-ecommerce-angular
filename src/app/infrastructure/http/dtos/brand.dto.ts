import { Brand } from '@domain/models';

export type CreateBrandDto = Omit<
  Brand,
  | 'id'
  | 'slug'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'logo'
> & {
  logo: File;
};

export type UpdateBrandDto = Partial<CreateBrandDto>;
