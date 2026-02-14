import { User } from '@models/user-model';

export interface StoreDetail {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  legalInformation: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updatedBy: User;
}
