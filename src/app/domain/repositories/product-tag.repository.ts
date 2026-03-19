import { BaseRepository } from '@domain/shared/base.repository';
import { ProductTag } from '@domain/models';
import { CreateProductTagDto } from '@infrastructure/http/dtos/product-tag.dto';

export abstract class ProductTagRepository extends BaseRepository<
  ProductTag,
  CreateProductTagDto
> {}
