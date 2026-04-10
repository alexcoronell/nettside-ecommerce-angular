import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseHttpRepository } from '../shared/base-http.repository';
import { Category } from '@domain/models';
import { CountDto, CreateCategoryDto, UpdateCategoryDto } from '@infrastructure/http/dtos';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { PaginationParams, PaginatedResult, ItemResult } from '@domain/types';
import { generateQueryParams } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpRepository extends BaseHttpRepository implements CategoryRepository {
  private readonly url = `${this.apiUrl}category`;

  count(): HttpResourceRef<CountDto | undefined> {
    return httpResource(() => `${this.url}/count`);
  }

  getAll(
    paginationParams?: PaginationParams | (() => PaginationParams)
  ): HttpResourceRef<PaginatedResult<Category>> {
    return httpResource(() => {
      const queryParams = generateQueryParams(paginationParams);
      return `${this.url}?${queryParams}`;
    }) as HttpResourceRef<PaginatedResult<Category>>;
  }

  getById(id: number): Observable<ItemResult<Category>> {
    return this.http.get<ItemResult<Category>>(`${this.url}/${id.toString()}`);
  }

  getBySlug(slug: string): HttpResourceRef<ItemResult<Category>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<ItemResult<Category>>;
  }

  create(dto: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(this.url, dto);
  }

  update(id: number, dto: UpdateCategoryDto): Observable<Category> {
    return this.http.patch<Category>(`${this.url}/${id.toString()}`, dto);
  }

  delete(id: number): Promise<unknown> {
    return firstValueFrom(this.http.delete<unknown>(`${this.url}/${id.toString()}`));
  }
}
