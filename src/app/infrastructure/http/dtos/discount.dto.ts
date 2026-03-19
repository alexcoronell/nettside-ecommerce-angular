import { Discount } from '@domain/models';

export type CreateDiscountDto = Omit<
  Discount,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateDiscountDto = Partial<CreateDiscountDto>;
