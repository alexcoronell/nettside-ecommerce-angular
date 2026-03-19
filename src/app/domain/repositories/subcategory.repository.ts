import { BaseRepository } from '@domain/shared/base.repository';
import { Subcategory } from '@domain/models';
import { CreateSubcategoryDto } from '@infrastructure/http/dtos/subcategory.dto';
import { PaginationParams, PaginatedResult } from '@domain/types';

export interface SubcategoryFilters {
  categorySlug?: string;
  search?: string;
}

export abstract class SubcategoryRepository extends BaseRepository<
  Subcategory,
  CreateSubcategoryDto
> {
  abstract override getAll(
    filters?: SubcategoryFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Subcategory>>;
}
