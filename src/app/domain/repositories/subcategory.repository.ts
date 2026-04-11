import { BaseRepository } from '@domain/shared/base.repository';
import { Subcategory } from '@domain/models';
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from '@infrastructure/http/dtos/subcategory.dto';

export interface SubcategoryFilters {
  categorySlug?: string;
  search?: string;
}

export abstract class SubcategoryRepository extends BaseRepository<
  Subcategory,
  CreateSubcategoryDto,
  UpdateSubcategoryDto
> {}
