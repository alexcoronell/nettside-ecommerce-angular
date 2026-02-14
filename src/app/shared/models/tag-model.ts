import { AuditModel } from '@models/audit-model';

export interface Tag extends AuditModel {
  name: string;
}
