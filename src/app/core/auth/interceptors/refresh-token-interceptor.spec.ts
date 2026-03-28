import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError, of, Observable, lastValueFrom } from 'rxjs';
import { vi } from 'vitest';

import { refreshTokenInterceptor } from './refresh-token-interceptor';
import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

describe('refreshTokenInterceptor', () => {
  let mockRequest: HttpRequest<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockNext: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAuthRepository: any;

  beforeEach(() => {
    mockAuthRepository = {
      refreshToken: vi.fn(),
      logout: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthHttpRepository, useValue: mockAuthRepository }
      ]
    });
    mockRequest = new HttpRequest('GET', '/test');
  });

  it('should be created', () => {
    expect(refreshTokenInterceptor).toBeTruthy();
  });

  it('should handle successful request without intercepting', async () => {
    mockNext = vi.fn().mockImplementation(() => of({ type: 4 } as HttpEvent<unknown>));
    
    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext) as Observable<HttpEvent<unknown>>;
      const event = await lastValueFrom(result$);
      expect(event).toBeTruthy();
      expect(mockAuthRepository.refreshToken).not.toHaveBeenCalled();
    });
  });

  it('should not catch error if status is not 401', async () => {
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext) as Observable<HttpEvent<unknown>>;
      try {
        await lastValueFrom(result$);
        throw new Error('Should have failed');
      } catch (err) {
        expect(err).toBe(errorResponse);
        expect(mockAuthRepository.refreshToken).not.toHaveBeenCalled();
      }
    });
  });

  it('should not refresh token if url includes auth/refresh', async () => {
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const refreshRequest = new HttpRequest('GET', '/api/v1/auth/refresh');
    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(refreshRequest, mockNext) as Observable<HttpEvent<unknown>>;
      try {
        await lastValueFrom(result$);
        throw new Error('Should have failed');
      } catch (err) {
        expect(err).toBe(errorResponse);
        expect(mockAuthRepository.refreshToken).not.toHaveBeenCalled();
      }
    });
  });

  it('should refresh token on 401 and retry request', async () => {
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    let isRetry = false;
    
    // First time it throws 401, second time it succeeds
    mockNext = vi.fn().mockImplementation(() => {
      if (!isRetry) {
        isRetry = true;
        return throwError(() => errorResponse);
      }
      return of({ type: 4 } as HttpEvent<unknown>);
    });

    mockAuthRepository.refreshToken.mockReturnValue(of(undefined));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext) as Observable<HttpEvent<unknown>>;
      const event = await lastValueFrom(result$);
      expect(event).toBeTruthy();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(2); // Initial and retry
    });
  });

  it('should logout on refresh token failure', async () => {
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const refreshError = new HttpErrorResponse({ status: 500, statusText: 'Refresh failed' });
    
    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse));
    mockAuthRepository.refreshToken.mockReturnValue(throwError(() => refreshError));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext) as Observable<HttpEvent<unknown>>;
      try {
        await lastValueFrom(result$);
        throw new Error('Should have failed');
      } catch (err) {
        expect(err).toBe(errorResponse); // The original 401 error is returned on failure
        expect(mockAuthRepository.logout).toHaveBeenCalled();
      }
    });
  });
});
