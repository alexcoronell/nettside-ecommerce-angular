import { AuditModel } from 'src/app/domain/models/audit-model';

export interface Tag extends AuditModel {
  name: string;
}
