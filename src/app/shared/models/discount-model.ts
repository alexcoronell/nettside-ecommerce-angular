import { AuditModel } from '@models/audit-model';

export interface Discount extends AuditModel {
  code: string;
  description: string;
  discountType: string;
  discountvalue: number;
  startDate: Date;
  endDate: Date;
  minimumOrderAmount: number;
  usageLimit: number;
  usageLimitPerUser: number;
  active: boolean;
}
