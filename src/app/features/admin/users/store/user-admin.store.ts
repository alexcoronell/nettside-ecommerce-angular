import { Injectable, computed, inject, signal } from '@angular/core';

/* Services */
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';

@Injectable({
  providedIn: 'root',
})
export class UserAdminStore {
  private readonly userHttpRepository = inject(UserHttpRepository);

  readonly resource = this.userHttpRepository.getAll();

  /* Computed Signals */
  readonly users = computed(() => this.resource.value()?.data ?? []);
  readonly isLoading = computed(() => this.resource.isLoading());
  readonly error = computed(() => this.resource.error());
}
