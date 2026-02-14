import { BaseModel } from '@models/base-model';
import { User } from './user-model';

export interface AuditModel extends BaseModel {
  createdBy: User;
  updatedBy: User;
  deletedBy: User | null;
}
