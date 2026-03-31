import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';

import { PaginationParams } from '@domain/types';

@Injectable({
  providedIn: 'root',
})
export class UserAdminStore {
  private readonly userHttpRepository = inject(UserHttpRepository);

  readonly page = signal(1);
  readonly limit = signal(10);
  readonly sortBy = signal('id');
  readonly sortOrder = signal<'DESC' | 'ASC'>('DESC');
  readonly search = signal<string | null>(null);
  readonly filterBy = signal<Record<string, string> | null>(null);

  /* Computed Signals */
  readonly users = computed(() => this.resource.value().data);
  readonly usersCalled = computed(() => true);
  readonly isLoading = computed(() => this.resource.isLoading());
  readonly error = computed(() => this.resource.error());

  readonly paginationParams = computed<PaginationParams>(() => ({
    page: this.page(),
    limit: this.limit(),
    sortBy: this.sortBy(),
    sortOrder: this.sortOrder(),
    search: this.search(),
    filterBy: this.filterBy(),
  }));

  readonly resource = this.userHttpRepository.getAll(this.paginationParams());

  loadUsers() {
    this.resource.reload();
  }
}
