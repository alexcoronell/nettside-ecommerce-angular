import { AuditModel } from 'src/app/domain/models/audit-model';
import { Sale } from 'src/app/domain/models/sale-model';
import { ShippingCompany } from 'src/app/domain/models/shipping-company-model';

export interface Shipment extends AuditModel {
  trackingNumber: string;
  shipmentDate: Date;
  estimatedDeliveryDate: string;
  status: string; // This will be an enum
  sale: Sale;
  shippingCompany: ShippingCompany;
}
