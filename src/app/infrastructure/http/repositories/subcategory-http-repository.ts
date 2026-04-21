import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Subcategory } from '@domain/models';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from '@infrastructure/http/dtos';
import { SubcategoryRepository } from '@domain/repositories/subcategory.repository';
import { ItemResult } from '@domain/types';
import { NameOnly } from '@domain/types/name-only.type';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryHttpRepository
  extends BaseCrudHttpRepository<Subcategory, CreateSubcategoryDto, UpdateSubcategoryDto>
  implements SubcategoryRepository
{
  protected readonly path = 'subcategory';

  getBySlug(slug: string): HttpResourceRef<ItemResult<Subcategory>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<
      ItemResult<Subcategory>
    >;
  }

  getAllNoPagination(): HttpResourceRef<ItemResult<NameOnly[]>> {
    return httpResource(() => `${this.url}/all`) as HttpResourceRef<ItemResult<NameOnly[]>>;
  }
}
