import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { throwError, of, lastValueFrom } from 'rxjs';
import { vi } from 'vitest';

import { refreshTokenInterceptor } from './refresh-token-interceptor';
import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

import { AuthStore } from '../stores/auth-store';

describe('refreshTokenInterceptor', () => {
  let mockRequest: HttpRequest<unknown>;
  let mockNext: HttpHandlerFn;
  let mockAuthRepository: { refreshToken: ReturnType<typeof vi.fn> };
  let mockAuthStore: { logout: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthRepository = {
      refreshToken: vi.fn(),
    };
    mockAuthStore = {
      logout: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthHttpRepository, useValue: mockAuthRepository },
        { provide: AuthStore, useValue: mockAuthStore },
      ],
    });
    mockRequest = new HttpRequest('GET', '/test');
  });

  it('should be created', () => {
    expect(refreshTokenInterceptor).toBeTruthy();
  });

  it('should handle successful request without intercepting', async () => {
    mockNext = vi
      .fn()
      .mockImplementation(() => of({ type: 4 } as HttpEvent<unknown>)) as HttpHandlerFn;

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext);
      const event = await lastValueFrom(result$);
      expect(event).toBeTruthy();
      expect(mockAuthRepository.refreshToken).not.toHaveBeenCalled();
    });
  });

  it('should not catch error if status is not 401', async () => {
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse)) as HttpHandlerFn;

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext);
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
    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse)) as HttpHandlerFn;

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(refreshRequest, mockNext);
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

    mockNext = vi.fn().mockImplementation(() => {
      if (!isRetry) {
        isRetry = true;
        return throwError(() => errorResponse);
      }
      return of({ type: 4 } as HttpEvent<unknown>);
    }) as HttpHandlerFn;

    mockAuthRepository.refreshToken.mockReturnValue(of(undefined));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext);
      const event = await lastValueFrom(result$);
      expect(event).toBeTruthy();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(2);
    });
  });

  it('should logout on refresh token failure', async () => {
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const refreshError = new HttpErrorResponse({ status: 500, statusText: 'Refresh failed' });

    mockNext = vi.fn().mockImplementation(() => throwError(() => errorResponse)) as HttpHandlerFn;
    mockAuthRepository.refreshToken.mockReturnValue(throwError(() => refreshError));

    await TestBed.runInInjectionContext(async () => {
      const result$ = refreshTokenInterceptor(mockRequest, mockNext);
      try {
        await lastValueFrom(result$);
        throw new Error('Should have failed');
      } catch (err) {
        expect(err).toBe(errorResponse);
        expect(mockAuthStore.logout).toHaveBeenCalled();
      }
    });
  });
});
