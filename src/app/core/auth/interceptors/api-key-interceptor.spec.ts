/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { apiKeyInterceptor } from './api-key-interceptor';
import { API_KEY } from '@core/tokens/api-key.token';

describe('apiKeyInterceptor', () => {
  let mockRequest: HttpRequest<unknown>;

  let mockNext: any;
  const mockApiKey = 'test-api-key-123';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: API_KEY, useValue: mockApiKey }],
    });
    mockRequest = new HttpRequest('GET', '/test');
    mockNext = vi.fn().mockImplementation(() => of({} as HttpEvent<unknown>));
  });

  it('should be created', () => {
    expect(apiKeyInterceptor).toBeTruthy();
  });

  it('should add the api key to the headers', () => {
    TestBed.runInInjectionContext(() => {
      apiKeyInterceptor(mockRequest, mockNext);
    });

    expect(mockNext).toHaveBeenCalled();
    const clonedRequest = mockNext.mock.calls[0][0] as HttpRequest<unknown>;
    expect(clonedRequest.headers.get('x-api-key')).toBe(mockApiKey);
  });
});
