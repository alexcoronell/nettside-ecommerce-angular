import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseHttpRepository } from '../shared/base-http.repository';
import { Brand } from '@domain/models';
import { CountDto, CreateBrandDto, UpdateBrandDto } from '@infrastructure/http/dtos';
import { BrandRepository } from '@domain/repositories/brand.repository';
import { PaginationParams, PaginatedResult, ItemResult } from '@domain/types';
import { generateQueryParams } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class BrandHttpRepository extends BaseHttpRepository implements BrandRepository {
  private readonly url = `${this.apiUrl}brand`;

  count(): HttpResourceRef<CountDto | undefined> {
    return httpResource(() => `${this.url}/count`);
  }

  getAll(
    paginationParams?: PaginationParams | (() => PaginationParams)
  ): HttpResourceRef<PaginatedResult<Brand>> {
    return httpResource(() => {
      const queryParams = generateQueryParams(paginationParams);
      return `${this.url}?${queryParams}`;
    }) as HttpResourceRef<PaginatedResult<Brand>>;
  }

  getById(id: number): Observable<ItemResult<Brand>> {
    return this.http.get<ItemResult<Brand>>(`${this.url}/${id.toString()}`);
  }

  getBySlug(slug: string): HttpResourceRef<ItemResult<Brand>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<ItemResult<Brand>>;
  }

  create(dto: CreateBrandDto): Observable<Brand> {
    const formData = new FormData();
    formData.append('name', dto.name);
    if (dto.logo && dto.logo.size > 0) {
      formData.append('file', dto.logo);
    }
    return this.http.post<Brand>(this.url, formData);
  }

  update(id: number, dto: UpdateBrandDto): Observable<Brand> {
    const formData = new FormData();
    if (dto.name) formData.append('name', dto.name);
    if (dto.logo && dto.logo.size > 0) {
      formData.append('file', dto.logo);
    }
    return this.http.patch<Brand>(`${this.url}/${id.toString()}`, formData);
  }

  delete(id: number): Promise<unknown> {
    return firstValueFrom(this.http.delete<unknown>(`${this.url}/${id.toString()}`));
  }
}
