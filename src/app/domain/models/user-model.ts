import { BaseModel } from './base-model';
import { UserRole } from '@domain/enums';

export interface User extends BaseModel {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phoneNumber: string;
  isActive: boolean;
  role: UserRole;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  createdBy: User;
  updatedBy: User;
  deletedBy: User;
}
