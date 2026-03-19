import { BaseModel } from 'src/app/domain/models/base-model';
import { Purchase } from 'src/app/domain/models/purchase-model';
import { Product } from 'src/app/domain/models/product-model';

export interface PurchaseDetail extends BaseModel {
  quantity: number;
  unitPrice: number;
  subTotal: number;
  purchase: Purchase;
  product: Product;
}
