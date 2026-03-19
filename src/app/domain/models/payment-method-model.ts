import { AuditModel } from 'src/app/domain/models/audit-model';

export interface PaymentMethod extends AuditModel {
  name: string;
}
