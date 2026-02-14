import { BaseModel } from '@models/base-model';
import { User } from './user-model';

export interface ProductImage extends BaseModel {
  filePath: string;
  title: string;
  isMain: number;
  isActive: number;
  uploadedBy: User;
  updatedBy: User;
}
