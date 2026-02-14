import { Product } from '@models/product-model';
import { User } from '@models/user-model';

export interface Wishlist {
  id: number;
  product: Product;
  user: User;
}
