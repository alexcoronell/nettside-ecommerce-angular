/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { CountDto } from '@infrastructure/http/dtos';
import { PaginationParams, PaginatedResult, ItemResult } from '@domain/types';
import { generateQueryParams } from '@shared/utils';
import { BaseHttpRepository } from './base-http.repository';

export abstract class BaseCrudHttpRepository<T, CreateDto, UpdateDto> extends BaseHttpRepository {
  protected abstract readonly path: string;

  protected get url(): string {
    return `${this.apiUrl}${this.path}`;
  }

  count(): HttpResourceRef<CountDto | undefined> {
    return httpResource(() => `${this.url}/count`);
  }

  getAll(
    paginationParams?: PaginationParams | (() => PaginationParams)
  ): HttpResourceRef<PaginatedResult<T>> {
    return httpResource(() => {
      const queryParams = generateQueryParams(paginationParams);
      return `${this.url}?${queryParams}`;
    }) as HttpResourceRef<PaginatedResult<T>>;
  }

  getById(id: number): Observable<ItemResult<T>> {
    return this.http.get<ItemResult<T>>(`${this.url}/${id.toString()}`);
  }

  create(dto: CreateDto): Observable<T> {
    return this.http.post<T>(this.url, dto);
  }

  update(id: number, dto: UpdateDto): Observable<T> {
    return this.http.patch<T>(`${this.url}/${id.toString()}`, dto);
  }

  delete(id: number): Promise<unknown> {
    return firstValueFrom(this.http.delete<unknown>(`${this.url}/${id.toString()}`));
  }
}
