import { PaymentMethod } from 'src/app/domain/models/payment-method-model';
import { User } from 'src/app/domain/models/user-model';

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
