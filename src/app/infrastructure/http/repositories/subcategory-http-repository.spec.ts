import { TestBed } from '@angular/core/testing';

import { SubcategoryHttpRepository } from './subcategory-http-repository';

describe('SubcategoryHttpRepository', () => {
  let service: SubcategoryHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoryHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
