import { Supplier } from '@domain/models';

export type CreateSupplierDto = Omit<
  Supplier,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateSupplierDto = Partial<CreateSupplierDto>;
