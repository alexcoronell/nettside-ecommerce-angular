/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { HttpResourceRef } from '@angular/common/http';
import { PaginationParams, PaginatedResult } from '@domain/types';
import { CountDto } from '@infrastructure/http/dtos';
import { Observable } from 'rxjs';
import { ItemResult } from '@domain/types';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  abstract count(): Promise<CountDto>;
  abstract getAll(
    pagination?: PaginationParams | (() => PaginationParams)
  ): HttpResourceRef<PaginatedResult<T>> | Promise<PaginatedResult<T>>;
  abstract getById(id: number): Promise<ItemResult<T>> | Observable<ItemResult<T>>;
  abstract create(entity: CreateDto): Observable<T> | Promise<T>;
  abstract update(id: number, entity: UpdateDto): Observable<T> | Promise<T>;
  abstract delete(id: number): Promise<unknown>;
}
