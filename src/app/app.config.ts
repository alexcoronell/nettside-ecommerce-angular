import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { API_URL } from '@core/tokens/api-url.token';
import { API_KEY } from '@core/tokens/api-key.token';
import { apiKeyInterceptor } from '@core/auth/interceptors/api-key-interceptor';
import { jwtInterceptor } from '@core/auth/interceptors/jwt-interceptor';
import { refreshTokenInterceptor } from '@core/auth/interceptors/refresh-token-interceptor';
import { environment } from '@environments/environment';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: environment.API_URL },
    { provide: API_KEY, useValue: environment.API_KEY },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([apiKeyInterceptor, jwtInterceptor, refreshTokenInterceptor])),
  ],
};
