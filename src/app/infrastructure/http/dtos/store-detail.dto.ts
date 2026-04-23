import { StoreDetail } from '@domain/models';

export type UpdateStoreDetailDto = Omit<
  StoreDetail,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;
