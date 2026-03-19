import { AuditModel } from 'src/app/domain/models/audit-model';
import { Product } from 'src/app/domain/models/product-model';
import { Supplier } from 'src/app/domain/models/supplier-model';

export interface ProductSupplier extends AuditModel {
  supplierProductCode: string;
  costPrice: number;
  product: Product;
  supplier: Supplier;
}
