import { AuditModel } from 'src/app/domain/models/audit-model';
import { Supplier } from 'src/app/domain/models/supplier-model';

export interface Purchase extends AuditModel {
  purchaseDate: Date;
  totalAmount: number;
  supplier: Supplier;
}
