import { TestBed } from '@angular/core/testing';

import { CategoryHttpRepository } from './category-http-repository';

describe('CategoryHttpRepository', () => {
  let service: CategoryHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
