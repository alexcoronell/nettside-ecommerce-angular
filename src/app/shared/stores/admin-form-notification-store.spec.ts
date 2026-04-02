import { TestBed } from '@angular/core/testing';

import { AdminFormNotificationStore } from './admin-form-notification-store';

describe('AdminFormNotificationStore', () => {
  let service: AdminFormNotificationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormNotificationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
