import { TestBed } from '@angular/core/testing';

import { ProductHttpRepository } from './product-http-repository';

describe('ProductHttpRepository', () => {
  let service: ProductHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
