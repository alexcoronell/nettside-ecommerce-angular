/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';

import { PaginationParams } from '@domain/types';
import { CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { UserRole } from '@domain/enums';
import { mapHttpError } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserAdminStore {
  private readonly userHttpRepository = inject(UserHttpRepository);

  /* Signals */
  readonly page = signal(1);
  readonly limit = signal(10);
  readonly sortBy = signal('id');
  readonly sortOrder = signal<'DESC' | 'ASC'>('DESC');
  readonly search = signal<string | null>(null);
  readonly filterBy = signal<Record<string, string> | null>(null);

  /* Computed Signals */
  readonly users = computed(() => this.resource.value()?.data ?? []);
  readonly total = computed(() => this.resource.value()?.meta?.total ?? 0);
  readonly status = computed(() => this.resource.status());
  readonly isLoading = computed(() => this.status() === 'loading' || this.status() === 'reloading');
  readonly error = computed(() => this.resource.error());

  readonly errorMessage = computed(() => {
    const err = this.error();
    if (!err) return null;

    console.log('[UserAdminStore] Error detected:', err);
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

  readonly resource = this.userHttpRepository.getAll(() => this.paginationParams());

  searchUsers(search: string) {
    this.search.set(search);
    this.getUsers();
  }

  getUsers() {
    this.resource.reload();
  }

  setLimit(limit: number) {
    this.limit.set(limit);
  }

  setRole(role: UserRole | null) {
    this.filterBy.set(role ? { role } : null);
    this.page.set(1);
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

  getUser(id: number) {
    return this.userHttpRepository.getById(id);
  }

  createUser(dto: CreateUserDto) {
    return this.userHttpRepository.create(dto);
  }

  updateUser(id: number, dto: UpdateUserDto) {
    return this.userHttpRepository.update(id, dto);
  }

  async deleteUser(id: number) {
    try {
      await this.userHttpRepository.delete(id);
      this.resource.reload();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }
}
