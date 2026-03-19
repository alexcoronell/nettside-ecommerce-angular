import { BaseRepository } from '@domain/shared/base.repository';
import { PaginationParams } from '@domain/types';
import { Product } from '@domain/models';
import { CreateProductDto } from '@infrastructure/http/dtos/product.dto';
import { PaginatedResult } from '@domain/types';

export interface ProductFilters {
  brandSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export abstract class ProductRepository extends BaseRepository<Product, CreateProductDto> {
  abstract override getAll(
    filters?: ProductFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Product>>;
}
