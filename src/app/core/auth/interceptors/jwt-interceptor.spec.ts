/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { jwtInterceptor } from './jwt-interceptor';

describe('jwtInterceptor', () => {
  let mockRequest: HttpRequest<unknown>;

  let mockNext: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockRequest = new HttpRequest('GET', '/test');
    mockNext = vi.fn().mockImplementation(() => of({} as HttpEvent<unknown>));
  });

  it('should be created', () => {
    expect(jwtInterceptor).toBeTruthy();
  });

  it('should set withCredentials to true', () => {
    TestBed.runInInjectionContext(() => {
      jwtInterceptor(mockRequest, mockNext);
    });

    expect(mockNext).toHaveBeenCalled();
    const clonedRequest = mockNext.mock.calls[0][0] as HttpRequest<unknown>;
    expect(clonedRequest.withCredentials).toBe(true);
  });
});
