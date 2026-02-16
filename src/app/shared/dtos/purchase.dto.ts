import { Purchase } from '@models/index';

export type CreatePurchaseDto = Omit<
  Purchase,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'supplier'
> & {
  supplier: number;
};

export type UpdatePurchaseDto = Partial<CreatePurchaseDto>;
