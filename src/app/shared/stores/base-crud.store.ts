/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { computed, signal } from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';
import { BaseRepository } from '@domain/shared/base.repository';
import { PaginationParams, PaginatedResult, ItemResult } from '@domain/types';
import { mapHttpError } from '@shared/utils';
import { from, Observable } from 'rxjs';

export abstract class BaseCrudStore<TEntity, TCreateDto, TUpdateDto> {
  readonly page = signal(1);
  readonly limit = signal(10);
  readonly sortBy = signal('id');
  readonly sortOrder = signal<'DESC' | 'ASC'>('DESC');
  readonly search = signal<string | null>(null);
  readonly filterBy = signal<Record<string, string> | null>(null);

  readonly isDeleting = signal(false);

  readonly resource: HttpResourceRef<PaginatedResult<TEntity>>;

  constructor(protected readonly repository: BaseRepository<TEntity, TCreateDto, TUpdateDto>) {
    this.resource = this.repository.getAll(() => this.paginationParams()) as HttpResourceRef<
      PaginatedResult<TEntity>
    >;
  }

  readonly items = computed(() => this.resource.value()?.data ?? []);
  readonly total = computed(() => this.resource.value()?.meta?.total ?? 0);
  readonly status = computed(() => this.resource.status());
  readonly isLoading = computed(() => this.status() === 'loading' || this.status() === 'reloading');
  readonly error = computed(() => this.resource.error());

  readonly errorMessage = computed(() => {
    const err = this.error();
    if (!err) return null;
    return mapHttpError(err);
  });

  readonly totalPages = computed(
    () => (this.resource.hasValue() ? this.resource.value()?.meta?.totalPages : 1) ?? 1
  );
  readonly hasNextPage = computed(
    () => (this.resource.hasValue() ? this.resource.value()?.meta?.hasNextPage : false) ?? false
  );
  readonly hasPreviousPage = computed(
    () => (this.resource.hasValue() ? this.resource.value()?.meta?.hasPreviousPage : false) ?? false
  );

  readonly paginationParams = computed<PaginationParams>(() => ({
    page: this.page(),
    limit: this.limit(),
    sortBy: this.sortBy(),
    sortOrder: this.sortOrder(),
    search: this.search(),
    filterBy: this.filterBy(),
  }));

  searchItems(search: string) {
    this.search.set(search);
    this.page.set(1);
    this.reload();
  }

  reload() {
    this.resource.reload();
  }

  setLimit(limit: number) {
    this.limit.set(limit);
    this.page.set(1);
  }

  firstPage() {
    this.page.set(1);
  }

  lastPage() {
    this.page.set(this.totalPages());
  }

  nextPage() {
    if (this.page() === this.totalPages()) return;
    this.page.set(this.page() + 1);
  }

  previousPage() {
    if (this.page() === 1) return;
    this.page.set(this.page() - 1);
  }

  resetSignals() {
    this.page.set(1);
    this.limit.set(10);
    this.sortBy.set('id');
    this.sortOrder.set('DESC');
    this.search.set(null);
    this.filterBy.set(null);
  }

  getItem(id: number): Observable<ItemResult<TEntity>> {
    const result = this.repository.getById(id);
    if (result instanceof Observable) return result;
    if (result instanceof Promise) return from(result);
    return result as unknown as Observable<ItemResult<TEntity>>;
  }

  createItem(dto: TCreateDto): Observable<TEntity> {
    return from(this.repository.create(dto));
  }

  updateItem(id: number, dto: TUpdateDto): Observable<TEntity> {
    return from(this.repository.update(id, dto));
  }

  async deleteItem(id: number): Promise<void> {
    this.isDeleting.set(true);
    try {
      await this.repository.delete(id);
      this.resource.reload();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isDeleting.set(false);
    }
  }
}
