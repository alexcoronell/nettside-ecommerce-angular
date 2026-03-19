import { AuditModel } from 'src/app/domain/models/audit-model';
import { Brand } from 'src/app/domain/models/brand-model';
import { Category } from 'src/app/domain/models/category-model';
import { Subcategory } from 'src/app/domain/models/subcategory-model';

export interface Product extends AuditModel {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: Brand;
  category: Category;
  subcategory: Subcategory;
}
