import { TestBed } from '@angular/core/testing';

import { AdminDeleteConfirmStore } from './admin-delete-confirm-store';

describe('AdminDeleteConfirmStore', () => {
  let service: AdminDeleteConfirmStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDeleteConfirmStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
