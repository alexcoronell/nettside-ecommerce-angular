import { AuditModel } from '@models/audit-model';
import { Product } from '@models/product-model';
import { Supplier } from '@models/supplier-model';

export interface ProductSupplier extends AuditModel {
  supplierProductCode: string;
  costPrice: number;
  product: Product;
  supplier: Supplier;
}
