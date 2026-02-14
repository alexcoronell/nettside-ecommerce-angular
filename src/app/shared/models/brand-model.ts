import { AuditModel } from '@models/audit-model';

export interface Brand extends AuditModel {
  name: string;
  slug: string;
}
