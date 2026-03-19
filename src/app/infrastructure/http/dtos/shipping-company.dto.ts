import { ShippingCompany } from '@domain/models';

export type CreateShippingCompanyDto = Omit<
  ShippingCompany,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateShippingCompanyDto = Partial<CreateShippingCompanyDto>;
