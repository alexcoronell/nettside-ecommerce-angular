import { BaseModel } from '@models/base-model';
import { User } from './user-model';
import { Product } from './product-model';

export interface ProductImage extends BaseModel {
  filePath: string;
  title: string;
  isMain: number;
  isActive: number;
  product: Product;
  uploadedBy: User;
  updatedBy: User;
}
