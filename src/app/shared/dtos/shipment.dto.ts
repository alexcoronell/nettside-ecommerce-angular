import { Shipment } from '@models/index';

export type CreateShipmentDto = Omit<
  Shipment,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'sale'
> & {
  sale: number;
};

export type UpdateShipmentDto = Partial<CreateShipmentDto>;
