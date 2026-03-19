import { BaseModel } from 'src/app/domain/models/base-model';
import { User } from 'src/app/domain/models/user-model';
import { Product } from 'src/app/domain/models/product-model';
import { Discount } from 'src/app/domain/models/discount-model';

export interface ProductDiscount extends BaseModel {
  productId: number;
  discountId: number;
  createdBy: User;
  product: Product;
  discount: Discount;
}
