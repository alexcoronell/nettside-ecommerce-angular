import { AuditModel } from 'src/app/domain/models/audit-model';
import { Category } from 'src/app/domain/models/category-model';

export interface Subcategory extends AuditModel {
  name: string;
  slug: string;
  category: Category;
}
