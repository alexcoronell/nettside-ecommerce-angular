import { AuditModel } from 'src/app/domain/models/audit-model';

export interface Discount extends AuditModel {
  name: string;
  description: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  minimumOrderAmount: number;
  usageLimit: number;
  usageLimitPerUser: number;
  active: boolean;
}
