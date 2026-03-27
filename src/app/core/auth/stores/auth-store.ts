import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

/* DTOs */
import { LoginDto } from '@infrastructure/http/dtos';

/* Models */
import { User } from '@domain/models';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private authRepository = inject(AuthHttpRepository);
  private readonly router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /* Private Signals */
  private readonly _user = signal<User | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  constructor() {
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser: unknown = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            this._user.set(parsedUser as User);
          }
        } catch (e) {
          console.error('Failed to parse user from session storage', e);
        }
      }
    }
  }

  /* Public Signals */
  readonly user = this._user.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  /* Computed Signals */
  readonly role = computed(() => this._user()?.role);

  /* Actions */
  login(payload: LoginDto) {
    this._isLoading.set(true);
    this._error.set(null);
    this.authRepository.login(payload).subscribe({
      next: (response) => {
        this._user.set(response.data);
        console.log(this.isBrowser);
        if (this.isBrowser) {
          localStorage.setItem('user', JSON.stringify(this._user()));
        }
        void this.router.navigate(['/']);
        this._isLoading.set(false);
      },
      error: (error) => {
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          (error as { status: number }).status === 401
        ) {
          this._error.set('Invalid credentials');
        } else {
          this._error.set('Something went wrong');
        }
        this._isLoading.set(false);
        setTimeout(() => {
          this._error.set(null);
        }, 3000);
      },
    });
  }

  logout() {
    this.authRepository.logout().subscribe({
      next: () => {
        this._user.set(null);
        localStorage.removeItem('user');
        void this.router.navigate(['/login']);
      },
      error: () => {
        this._error.set('Something went wrong');
        setTimeout(() => {
          this._error.set(null);
        }, 3000);
      },
    });
  }
}
