import { TestBed } from '@angular/core/testing';

import { SupplierAdminStore } from './supplier-admin-store';

describe('SupplierAdminStore', () => {
  let service: SupplierAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
