import { TestBed } from '@angular/core/testing';

import { LookupsStore } from './lookups-store';

describe('LookupsStore', () => {
  let service: LookupsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
