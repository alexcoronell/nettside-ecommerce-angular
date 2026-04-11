import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { Brand } from '@domain/models';
import { CreateBrandDto, UpdateBrandDto } from '@infrastructure/http/dtos';
import { BrandRepository } from '@domain/repositories/brand.repository';
import { ItemResult } from '@domain/types';

@Injectable({
  providedIn: 'root',
})
export class BrandHttpRepository
  extends BaseCrudHttpRepository<Brand, CreateBrandDto, UpdateBrandDto>
  implements BrandRepository
{
  protected readonly path = 'brand';

  getBySlug(slug: string): HttpResourceRef<ItemResult<Brand>> {
    return httpResource(() => `${this.url}/slug/${slug}`) as HttpResourceRef<ItemResult<Brand>>;
  }

  override create(dto: CreateBrandDto): Observable<Brand> {
    const formData = new FormData();
    formData.append('name', dto.name);
    if (dto.logo && dto.logo.size > 0) {
      formData.append('file', dto.logo);
    }
    return this.http.post<Brand>(this.url, formData);
  }

  override update(id: number, dto: UpdateBrandDto): Observable<Brand> {
    const formData = new FormData();
    if (dto.name) formData.append('name', dto.name);
    if (dto.logo && dto.logo.size > 0) {
      formData.append('file', dto.logo);
    }
    return this.http.patch<Brand>(`${this.url}/${id.toString()}`, formData);
  }
}
