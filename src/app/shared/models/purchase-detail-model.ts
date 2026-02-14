import { BaseModel } from '@models/base-model';
import { Purchase } from '@models/purchase-model';
import { Product } from '@models/product-model';

export interface PurchaseDetail extends BaseModel {
  quantity: number;
  unitPrice: number;
  subTotal: number;
  purchase: Purchase;
  product: Product;
}
