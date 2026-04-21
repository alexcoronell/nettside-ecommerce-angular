import { TestBed } from '@angular/core/testing';

import { DiscountHttpRepository } from './discount-http-repository';

describe('DiscountHttpRepository', () => {
  let service: DiscountHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
