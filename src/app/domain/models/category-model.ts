import { AuditModel } from 'src/app/domain/models/audit-model';

export interface Category extends AuditModel {
  name: string;
  slug: string;
}
