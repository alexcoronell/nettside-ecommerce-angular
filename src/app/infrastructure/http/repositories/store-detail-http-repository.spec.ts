import { TestBed } from '@angular/core/testing';

import { StoreDetailHttpRepository } from './store-detail-http-repository';

describe('StoreDetailHttpRepository', () => {
  let service: StoreDetailHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDetailHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
