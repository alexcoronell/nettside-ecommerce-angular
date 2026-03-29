import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { AuthStore } from './auth-store';
import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

describe('AuthStore', () => {
  let service: AuthStore;

  let mockAuthRepository: { login: ReturnType<typeof vi.fn>; logout: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthRepository = {
      login: vi.fn(),
      logout: vi.fn(),
    };
    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthHttpRepository, useValue: mockAuthRepository },
        { provide: Router, useValue: mockRouter },
      ],
    });
    service = TestBed.inject(AuthStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
