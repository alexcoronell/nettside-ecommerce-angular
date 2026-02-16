import { ProductSupplier } from '@models/index';

export type CreateProductSupplierDto = Omit<
  ProductSupplier,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'product'
  | 'supplier'
> & {
  product: number;
  supplier: number;
};

export type UpdateProductSupplierDto = Partial<
  Omit<CreateProductSupplierDto, 'product' | 'supplier'>
>;
