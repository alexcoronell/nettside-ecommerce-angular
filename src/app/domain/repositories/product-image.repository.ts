import { BaseRepository } from '@domain/shared/base.repository';
import { ProductImage } from '@domain/models';
import { CreateProductImageDto } from '@infrastructure/http/dtos/product-image.dto';

export abstract class ProductImageRepository extends BaseRepository<
  ProductImage,
  CreateProductImageDto
> {}
