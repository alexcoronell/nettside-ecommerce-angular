import { ProductDiscount } from '@models/index';

export type CreateProductDiscountDto = Omit<
  ProductDiscount,
  | 'id'
  | 'productId'
  | 'discountId'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'product'
  | 'discount'
> & {
  product: number;
  discount: number;
};
