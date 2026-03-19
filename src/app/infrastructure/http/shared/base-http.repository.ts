import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/tokens/api-url.token';

export abstract class BaseHttpRepository {
  protected readonly http = inject(HttpClient);
  protected readonly apiUrl = inject(API_URL);
  protected readonly options = { withCredentials: true } as const;
}
