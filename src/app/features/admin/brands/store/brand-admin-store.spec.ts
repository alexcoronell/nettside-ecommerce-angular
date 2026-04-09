import { TestBed } from '@angular/core/testing';

import { BrandAdminStore } from './brand-admin-store';

describe('BrandAdminStore', () => {
  let service: BrandAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
