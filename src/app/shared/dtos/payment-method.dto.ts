import { PaymentMethod } from '@models/index';

export type CreatePaymentMethodDto = Omit<
  PaymentMethod,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdatePaymentMethodDto = Partial<CreatePaymentMethodDto>;
