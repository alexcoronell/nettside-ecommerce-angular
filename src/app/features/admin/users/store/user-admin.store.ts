import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';

import { PaginationParams } from '@domain/types';
import { CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { UserRole } from '@domain/enums';

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
  readonly _resource = computed(() => this.resource.value());
  readonly users = computed(() => this.resource.value().data);
  readonly total = computed(() => this.resource.value().meta.total);
  readonly status = computed(() => this.resource.status());
  readonly isLoading = computed(() => this.status() === 'loading' || this.status() === 'reloading');
  readonly error = computed(() => this.resource.error());

  readonly errorMessage = computed(() => {
    const err = this.error();
    if (!err) return null;

    const e = err as {
      status?: number;
      name?: string;
      message?: string;
      error?: { status?: number; message?: string };
    };
    if (
      e.status === 0 ||
      e.error?.status === 0 ||
      e.name === 'TimeoutError' ||
      e.message?.includes('0')
    ) {
      return 'Cannot connect to the server. Please check if the connection.';
    }
    if (e.status === 401) {
      return "You don't have permission to access this resource.";
    }
    return e.message ?? e.error?.message ?? 'Something went wrong. Please try again later.';
  });

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
