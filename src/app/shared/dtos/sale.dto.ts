import { Sale } from '@models/index';

export type CreateSaleDto = Omit<
  Sale,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'paymentMethod'
  | 'user'
  | 'shippingAddress'
> & {
  paymentMethod: number;
  user: number;
};

export type UpdateSaleDto = Partial<CreateSaleDto>;
