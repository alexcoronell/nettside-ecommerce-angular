import { TestBed } from '@angular/core/testing';

import { AuthHttpRepository } from './auth-http-repository';

describe('AuthHttpRepository', () => {
  let service: AuthHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
