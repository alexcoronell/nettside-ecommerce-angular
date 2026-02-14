import { AuditModel } from '@models/audit-model';

export interface ShippingCompany extends AuditModel {
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
}
