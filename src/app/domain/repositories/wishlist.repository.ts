import { BaseRepository } from '@domain/shared/base.repository';
import { Wishlist } from '@domain/models';
import { CreateWishlistDto } from '@infrastructure/http/dtos/wishlist.dto';

export abstract class WishlistRepository extends BaseRepository<Wishlist, CreateWishlistDto> {}
