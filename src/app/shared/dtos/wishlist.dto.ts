import { Wishlist } from '@models/index';

export type CreateWishlistDto = Omit<Wishlist, 'id' | 'product' | 'user'> & {
  product: number;
  user: number;
};
