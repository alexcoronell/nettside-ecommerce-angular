import { Product } from 'src/app/domain/models/product-model';
import { Sale } from 'src/app/domain/models/sale-model';

export interface SaleDetail {
  id: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  createdAt: Date;
  sale: Sale;
  product: Product;
}
