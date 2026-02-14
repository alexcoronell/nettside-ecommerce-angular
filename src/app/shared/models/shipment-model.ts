import { AuditModel } from '@models/audit-model';
import { Sale } from '@models/sale-model';
import { ShippingCompany } from '@models/shipping-company-model';

export interface Shipment extends AuditModel {
  trackingNumber: string;
  shipmentDate: Date;
  estimatedDeliveryDate: string;
  status: string; // This will be an enum
  sale: Sale;
  shippingCompany: ShippingCompany;
}
