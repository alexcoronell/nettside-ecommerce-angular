import { TestBed } from '@angular/core/testing';

import { BrandHttpRepository } from './brand-http-repository';

describe('BrandHttpRepository', () => {
  let service: BrandHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
