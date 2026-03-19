import { Purchase } from '@domain/models';

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
