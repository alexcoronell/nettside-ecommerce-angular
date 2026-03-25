import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_KEY } from '@core/tokens/api-key.token';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = inject(API_KEY);
  const authReq = req.clone({
    setHeaders: {
      'x-api-key': apiKey,
    },
  });
  return next(authReq);
};
