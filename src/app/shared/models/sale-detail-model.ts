import { Product } from '@models/product-model';
import { Sale } from '@models/sale-model';

export interface SaleDetail {
  id: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  createdAt: Date;
  sale: Sale;
  product: Product;
}
