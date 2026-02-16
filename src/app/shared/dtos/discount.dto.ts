import { Discount } from '@models/index';

export type CreateDiscountDto = Omit<
  Discount,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateDiscountDto = Partial<CreateDiscountDto>;
