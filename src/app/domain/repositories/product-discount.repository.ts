import { BaseRepository } from '@domain/shared/base.repository';
import { ProductDiscount } from '@domain/models';
import { CreateProductDiscountDto } from '@infrastructure/http/dtos/product-discount.dto';

export abstract class ProductDiscountRepository extends BaseRepository<
  ProductDiscount,
  CreateProductDiscountDto
> {}
