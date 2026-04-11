/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { CategoryHttpRepository } from '@infrastructure/http/repositories/category-http-repository';

import { PaginationParams } from '@domain/types';
import { CreateCategoryDto, UpdateCategoryDto } from '@infrastructure/http/dtos';
import { mapHttpError } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdminStore {
  private readonly categoryHttpRepository = inject(CategoryHttpRepository);

  /* Signals */
  readonly page = signal(1);
  readonly limit = signal(10);
  readonly sortBy = signal('id');
  readonly sortOrder = signal<'DESC' | 'ASC'>('DESC');
  readonly search = signal<string | null>(null);
  readonly filterBy = signal<Record<string, string> | null>(null);

  /* Computed Signals */
  readonly categories = computed(() => this.resource.value()?.data ?? []);
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

  readonly resource = this.categoryHttpRepository.getAll(() => this.paginationParams());

  searchCategories(search: string) {
    this.search.set(search);
    this.getCategories();
  }

  getCategories() {
    this.resource.reload();
  }

  setLimit(limit: number) {
    this.limit.set(limit);
  }

  firstPage() {
    this.page.set(1);
  }

  lastPage() {
    this.page.set(this.totalPages());
  }

  nextPage() {
    if (this.page() === this.totalPages()) {
      return;
    }
    this.page.set(this.page() + 1);
  }

  previousPage() {
    if (this.page() === 1) {
      return;
    }
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

  getCategory(id: number) {
    return this.categoryHttpRepository.getById(id);
  }

  createCategory(dto: CreateCategoryDto) {
    return this.categoryHttpRepository.create(dto);
  }

  updateCategory(id: number, dto: UpdateCategoryDto) {
    return this.categoryHttpRepository.update(id, dto);
  }

  async deleteCategory(id: number) {
    try {
      await this.categoryHttpRepository.delete(id);
      this.resource.reload();
    } catch (error) {
      console.error('Error deleting category', error);
    }
  }
}
