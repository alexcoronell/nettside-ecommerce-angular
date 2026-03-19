import { Product } from 'src/app/domain/models/product-model';
import { User } from 'src/app/domain/models/user-model';

export interface Wishlist {
  id: number;
  product: Product;
  user: User;
}
