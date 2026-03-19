import { StoreDetail } from '@domain/models';

export type CreateStoreDetailDto = Omit<
  StoreDetail,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateStoreDetailDto = Partial<CreateStoreDetailDto>;
