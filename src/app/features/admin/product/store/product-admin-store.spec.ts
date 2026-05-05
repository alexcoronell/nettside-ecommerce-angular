import { TestBed } from '@angular/core/testing';

import { ProductAdminStore } from './product-admin-store';

describe('ProductAdminStore', () => {
  let service: ProductAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
