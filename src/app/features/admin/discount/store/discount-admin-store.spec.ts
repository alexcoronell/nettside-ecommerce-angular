import { TestBed } from '@angular/core/testing';

import { DiscountAdminStore } from './discount-admin-store';

describe('DiscountAdminStore', () => {
  let service: DiscountAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
