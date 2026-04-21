import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Category } from '@domain/models';
import { CreateCategoryDto, UpdateCategoryDto } from '@infrastructure/http/dtos';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { ItemResult } from '@domain/types';
import { NameOnly } from '@domain/types/name-only.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpRepository
  extends BaseCrudHttpRepository<Category, CreateCategoryDto, UpdateCategoryDto>
  implements CategoryRepository
{
  protected readonly path = 'category';

  getBySlug(slug: string): HttpResourceRef<ItemResult<Category>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<ItemResult<Category>>;
  }

  getAllNoPagination(): HttpResourceRef<ItemResult<NameOnly[]>> {
    return httpResource(() => `${this.url}/all`) as HttpResourceRef<ItemResult<NameOnly[]>>;
  }
}
