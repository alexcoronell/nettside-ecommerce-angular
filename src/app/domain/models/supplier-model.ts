import { AuditModel } from 'src/app/domain/models/audit-model';

export interface Supplier extends AuditModel {
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  website?: string;
  state?: string;
  city?: string;
  county?: string;
  streetAddress?: string;
  postalCode?: string;
  notes?: string;
}
