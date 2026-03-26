import { TestBed } from '@angular/core/testing';

import { UserHttpRepository } from './user-http-repository';

describe('UserHttpRepository', () => {
  let service: UserHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
