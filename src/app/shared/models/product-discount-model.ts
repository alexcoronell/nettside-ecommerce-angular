import { BaseModel } from '@models/base-model';
import { User } from '@models/user-model';
import { Product } from '@models/product-model';
import { Discount } from '@models/discount-model';

export interface ProductDiscount extends BaseModel {
  productId: number;
  discountId: number;
  createdBy: User;
  product: Product;
  discount: Discount;
}
