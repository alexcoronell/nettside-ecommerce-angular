import { PurchaseDetail } from '@models/index';

export type CreatePurchaseDetailDto = Omit<
  PurchaseDetail,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'purchase'
  | 'product'
> & {
  purchase: number;
  product: number;
};

export type UpdatePurchaseDetailDto = Partial<CreatePurchaseDetailDto>;
