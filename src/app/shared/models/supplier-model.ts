import { AuditModel } from '@models/audit-model';

export interface Supplier extends AuditModel {
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
}
