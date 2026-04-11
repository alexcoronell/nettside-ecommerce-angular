import { TestBed } from '@angular/core/testing';

import { CategoryAdminStore } from './category-admin-store';

describe('CategoryAdminStore', () => {
  let service: CategoryAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
