import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authRepository = inject(AuthHttpRepository);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        return authRepository.refreshToken().pipe(
          switchMap(() => next(req)),
          catchError(() => {
            authRepository.logout();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
