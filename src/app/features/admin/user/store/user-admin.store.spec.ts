import { TestBed } from '@angular/core/testing';

import { UserAdminStore } from './user-admin.store';

describe('UserAdminStore', () => {
  let service: UserAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
