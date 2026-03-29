import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';
import { AuthStore } from '../stores/auth-store';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authRepository = inject(AuthHttpRepository);
  const authStore = inject(AuthStore);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        return authRepository.refreshToken().pipe(
          switchMap(() => next(req)),
          catchError(() => {
            if (isBrowser) {
              authStore.logout();
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
