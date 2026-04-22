import { TestBed } from '@angular/core/testing';

import { SupplierHttpRepository } from './supplier-http-repository';

describe('SupplierHttpRepository', () => {
  let service: SupplierHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
