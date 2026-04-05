import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';

import { PaginationParams } from '@domain/types';
import { CreateUserDto } from '@infrastructure/http/dtos';

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
  readonly users = computed(() => this.resource.value().data);
  readonly total = computed(() => this.resource.value().meta.total);
  readonly isLoading = computed(() => this.resource.isLoading());
  readonly error = computed(() => this.resource.error());
  readonly totalPages = computed(() => this.resource.value().meta.totalPages);
  readonly hasNextPage = computed(() => this.resource.value().meta.hasNextPage);
  readonly hasPreviousPage = computed(() => this.resource.value().meta.hasPreviousPage);

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
    this.loadUsers();
  }

  loadUsers() {
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

  loadUser(id: number) {
    return this.userHttpRepository.getById(id);
  }

  createUser(dto: CreateUserDto) {
    return this.userHttpRepository.create(dto);
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
