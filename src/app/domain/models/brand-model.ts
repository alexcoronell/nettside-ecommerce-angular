import { AuditModel } from 'src/app/domain/models/audit-model';

export interface Brand extends AuditModel {
  name: string;
  slug: string;
  logo?: string;
}
