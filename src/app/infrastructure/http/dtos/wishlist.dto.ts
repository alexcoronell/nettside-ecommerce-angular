import { Wishlist } from '@domain/models';

export type CreateWishlistDto = Omit<Wishlist, 'id' | 'product' | 'user'> & {
  product: number;
  user: number;
};
