import { BaseRepository } from '@domain/shared/base.repository';
import { HttpResourceRef } from '@angular/common/http';
import { ItemResult } from '@domain/types';
import { Product } from '@domain/models';
import { CreateProductDto, UpdateProductDto } from '@infrastructure/http/dtos/product.dto';

export interface ProductFilters {
  brandSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export abstract class ProductRepository extends BaseRepository<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  abstract getBySlug(slug: string): HttpResourceRef<ItemResult<Product>>;
}
