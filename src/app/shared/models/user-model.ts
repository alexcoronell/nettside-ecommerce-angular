import { BaseModel } from '@models/base-model';

export interface User extends BaseModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  role: string; //This will be an enum
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  createdBy: User;
  updatedBy: User;
  deletedBy: User;
}
