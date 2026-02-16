import { Supplier } from '@models/index';

export type CreateSupplierDto = Omit<
  Supplier,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateSupplierDto = Partial<CreateSupplierDto>;
