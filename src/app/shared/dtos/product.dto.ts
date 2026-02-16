import { Product } from '@models/index';

export type CreateProductDto = Omit<
  Product,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'brand'
  | 'category'
  | 'subcategory'
> & {
  brand: number;
  category: number;
  subcategory: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;
