import { AuditModel } from '@models/audit-model';
import { Brand } from '@models/brand-model';
import { Category } from '@models/category-model';
import { Subcategory } from '@models/subcategory-model';

export interface Product extends AuditModel {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: Brand;
  category: Category;
  subcategory: Subcategory;
}
