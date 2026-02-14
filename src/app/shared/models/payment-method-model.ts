import { AuditModel } from '@models/audit-model';

export interface PaymentMethod extends AuditModel {
  name: string;
}
