import { AuditModel } from '@models/audit-model';
import { Supplier } from '@models/supplier-model';

export interface Purchase extends AuditModel {
  purchaseDate: Date;
  totalAmount: number;
  supplier: Supplier;
}
