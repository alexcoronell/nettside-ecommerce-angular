import { AuditModel } from '@models/audit-model';

export interface Category extends AuditModel {
  name: string;
  slug: string;
}
