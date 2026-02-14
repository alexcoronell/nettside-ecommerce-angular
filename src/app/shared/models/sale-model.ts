import { PaymentMethod } from '@models/payment-method-model';
import { User } from '@models/user-model';

export interface Sale {
  id: number;
  saleDate: string;
  totalAmount: number;
  shippingAddress: number;
  status: string; // This will be change by enum
  cancelledAt: Date | null;
  isCancelled: boolean;
  paymentMethod: PaymentMethod;
  user: User;
}
