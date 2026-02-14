import { AuditModel } from '@models/audit-model';
import { Category } from '@models/category-model';

export interface Subcategory extends AuditModel {
  name: string;
  slug: string;
  category: Category;
}
