import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth-store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If we are on the server, we don't have access to localStorage.
  // We let it pass so the server can generate the skeleton,
  // and rely on browser-side execution for accurate guard redirection
  // or the interceptor failing and redirecting.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authStore.user()) {
    return true;
  }

  // Redirect to login with return URL
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
