import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, shareReplay, tap, timeout } from 'rxjs';

/* Services */
import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

/* DTOs */
import { LoginDto } from '@infrastructure/http/dtos';

/* Models */
import { User } from '@domain/models';
import { mapHttpError } from '@shared/utils/error-mapper.util';

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

  /* Private State for Auth Synchronization */
  private _refreshTokenRequest: Observable<unknown> | null = null;

  constructor() {
    if (this.isBrowser) {
      console.log('[AuthStore] Initializing from browser platform');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser: unknown = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            this._user.set(parsedUser as User);
          }
        } catch (e) {
          console.error('[AuthStore] Failed to parse user from local storage', e);
        }
      } else {
        console.log('[AuthStore] No user found in local storage');
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
        console.log('[AuthStore] Login successful', response.data.email);
        this._user.set(response.data);
        if (this.isBrowser) {
          localStorage.setItem('user', JSON.stringify(this._user()));
        }
        void this.router.navigate(['/']);
        this._isLoading.set(false);
      },
      error: (error) => {
        this._error.set(mapHttpError(error));
        console.error('[AuthStore] Login failed', error);
        this._isLoading.set(false);
        setTimeout(() => {
          this._error.set(null);
        }, 3000);
      },
    });
  }

  refreshToken(): Observable<unknown> {
    if (this._refreshTokenRequest) {
      console.log('[AuthStore] Waiting for existing refresh token request...');
      return this._refreshTokenRequest;
    }

    console.log('[AuthStore] Starting refresh token process...');
    this._refreshTokenRequest = this.authRepository.refreshToken().pipe(
      timeout(5000),
      tap(() => {
        console.log('[AuthStore] Refresh token successful');
        this._refreshTokenRequest = null;
      }),
      catchError((error: unknown) => {
        const errorMsg = mapHttpError(error);
        console.error(`[AuthStore] Refresh token failed: ${errorMsg}`, error);
        this._refreshTokenRequest = null;
        if (this.isBrowser) {
          this.logout();
        }
        throw error;
      }),
      shareReplay(1)
    );

    return this._refreshTokenRequest;
  }

  logout() {
    console.log('[AuthStore] Logging out...');
    this._user.set(null);
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    void this.router.navigate(['/login']);

    this.authRepository.logout().subscribe({
      next: () => {
        // Backend successfully logged out
      },
      error: () => {
        // Backend failed to logout, but we already cleared local state
        console.error('Failed to logout from backend');
      },
    });
  }
}
