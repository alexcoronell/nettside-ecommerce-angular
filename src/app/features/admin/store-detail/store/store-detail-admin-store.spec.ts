import { TestBed } from '@angular/core/testing';

import { StoreDetailAdminStore } from './store-detail-admin-store';

describe('StoreDetailAdminStore', () => {
  let service: StoreDetailAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDetailAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
