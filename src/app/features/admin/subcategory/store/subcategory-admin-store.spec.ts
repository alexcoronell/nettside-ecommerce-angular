import { TestBed } from '@angular/core/testing';

import { SubcategoryAdminStore } from './subcategory-admin-store';

describe('SubcategoryAdminStore', () => {
  let service: SubcategoryAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoryAdminStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
